import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer, throwError, from, combineLatest } from 'rxjs';
import { switchMap, concatMapTo, retryWhen, delay, mergeMap, concatMap, toArray, map, tap } from 'rxjs/operators';

import { Asset } from '../store/asset';
import { ASSET_ID, RANGES, STATUS } from '../store/global_constants';
import { AppState } from '../store/app_state';
import { parseJsonToAppstate } from '../logic/parse_json_to_appstate';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private nextPossibleAPIRequest: Date = new Date();


  constructor(private httpClient: HttpClient) {
  }


  public storeState(appState: AppState): void {
    localStorage.setItem('AppState', JSON.stringify(appState));
  }



  public loadState(): Observable<AppState> {
    let loadedState: AppState = parseJsonToAppstate(localStorage.getItem('AppState'));
    loadedState.uiState.isLoading = true; //muss in jedem Fall auf true gesetzt werden, bis API Success eintritt
    loadedState.uiState.errorMessage = ""; //falls noch ein alter Error abgespeichert war
    return of(loadedState);
  }





  public updateAssets(assets: ReadonlyArray<Asset>): Observable<ReadonlyArray<Asset>> {

    return this.getAssetsFromAPI(assets).pipe(
      switchMap(assets => this.getSparklinesFromAPI(assets))
    );
  }

  private getAllAssetsFromAPI(length: number): Observable<any> {
    return this.httpClient.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${length}&page=1&sparkline=false`)
  }



  private getAssetsFromAPI(assets: ReadonlyArray<Asset>): Observable<ReadonlyArray<Asset>> {
    const updatedAssets: Asset[] = [];
    let retries = 3;
    return timer(this.getDelayForNextAPIRequest())
      .pipe(
        concatMapTo(this.getAllAssetsFromAPI(assets.length + 100)),
        retryWhen(errors => errors
          .pipe(
            delay(this.getDelayForNextAPIRequest()),
            mergeMap(error => retries-- > 0 ? of(error) : throwError("Crypto data server not available. Please try again."))
          )
        ),
        switchMap(
          data => {
            //Daten in updatedAsset[] einpflegen
            for (let asset of assets) {
              const assetData = data.find(a => asset.id === a.id);
              if (assetData) {
                updatedAssets.push(new Asset(
                  asset.id,
                  asset.symbol,
                  asset.name,
                  asset.status,
                  assetData.image,
                  assetData.current_price,
                  assetData.atl_date,
                  asset.history,
                  asset.amount_history,
                  asset.amount_timestamps
                )
                )
              }
              else {
                updatedAssets.push(asset.clone());
              }
            }
            return of(updatedAssets);
          }
        ),
      );
  }




  private getDelayForNextAPIRequest(): number {
    //nötig, weil nomics nur einen Request pro Sekunde verarbeitet (deprecated weil jetzt CoinGecko API)
    let delay: number;
    const jetzt = new Date();
    if (jetzt > this.nextPossibleAPIRequest) {
      delay = 0;
      this.nextPossibleAPIRequest = new Date(new Date().getTime() + 10);
    }
    else {
      delay = this.nextPossibleAPIRequest.getTime() - jetzt.getTime();
      this.nextPossibleAPIRequest = new Date(this.nextPossibleAPIRequest.getTime() + 10);
    }
    return delay;
  }




  private getSparklinesFromAPI(assets: ReadonlyArray<Asset>): Observable<ReadonlyArray<Asset>> {
    return from(assets).pipe(
      concatMap(asset =>
        combineLatest([
          of(asset),
          this.getSparklineFromAPI(asset, RANGES.day),
          this.getSparklineFromAPI(asset, RANGES.week),
          this.getSparklineFromAPI(asset, RANGES.month),
          this.getSparklineFromAPI(asset, RANGES.year),
          this.getSparklineFromAPI(asset, RANGES.all)
        ])
          .pipe(
            map(([asset, day, week, month, year, all]) =>
              new Asset(
                asset.id,
                asset.symbol,
                asset.name,
                asset.status,
                asset.logo_url,
                asset.price,
                asset.first_trade,
                [day, week, month, year, all],
                asset.amount_history,
                asset.amount_timestamps
              )
            )
          )
      ),
      toArray()
    );
  }









  private getSparklineFromAPI(asset: Asset, range: number): Observable<any> {

    //bei TOTAL und USD gibt es keine Sparkline von API
    if (asset.id === ASSET_ID.total || asset.id === ASSET_ID.usd) {
      return of(asset.history[range]);
    }


    const days = this.getDays(range);
    let retries = 1;
    return timer(this.getDelayForNextAPIRequest())
      .pipe(
        concatMapTo(this.httpClient.get<any>(`https://api.coingecko.com/api/v3/coins/${asset.id}/market_chart?vs_currency=usd&days=${days}`)),
        retryWhen(errors => errors
          .pipe(
            delay(this.getDelayForNextAPIRequest()),
            mergeMap(error => retries-- > 0 ? of(error) : throwError("Crypto data server not available. Please try again."))
          )
        ),
        switchMap(
          assetData => {
            const sparkline = asset.history[range];

            if (assetData) {
              sparkline.prices = assetData.prices.map(x => Number(x[1]));
              sparkline.timestamps = assetData.prices.map(x => new Date(x[0]));
              sparkline.prices.push(asset.price); //aktuellsten Preis per Hand dazu
              sparkline.timestamps.push(new Date());
            }

            return of(sparkline);
          }
        )
      );
  }










  private getDays(range: number): string {

    switch (range) {

      case RANGES.day: {
        return "1";
      }
      case RANGES.week: {
        return "7";
      }
      case RANGES.month: {
        return "28";
      }
      case RANGES.year: {
        return "365";
      }
      case RANGES.all: {
        return "max";
      }
    }
  }










  public findNewOffer(excludedAssets: ReadonlyArray<Asset>): Observable<ReadonlyArray<Asset>> {
    let retries = 3;
    return timer(this.getDelayForNextAPIRequest())
      .pipe(
        concatMapTo(this.getAllAssetsFromAPI(excludedAssets.length + 50)),//es werden 50 cryptos mehr als die vorhandenen geladen
        retryWhen(errors => errors
          .pipe(
            delay(this.getDelayForNextAPIRequest()),
            mergeMap(error => retries-- > 0 ? of(error) : throwError("Crypto data server not available. Please try again."))
          )
        ),
        switchMap((assetData) => {
          //ein Array von 4 Assets, die noch nicht im Besitz sind
          const unpickedAssets = assetData.filter(d => !excludedAssets.find(x => x.id === d.id));
          const newOffer: Asset[] = [];
          while (newOffer.length < 4) {
            const d = unpickedAssets.splice(Math.floor(Math.random() * unpickedAssets.length), 1)[0];
            newOffer.push(new Asset(d.id, d.symbol, d.name, STATUS.offered, d.logo_url, d.price, d.first_trade, [], [0], []));
          }
          return of(newOffer);
        })
      );
  }

}
