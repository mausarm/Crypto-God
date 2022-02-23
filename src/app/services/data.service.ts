import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer, throwError } from 'rxjs';
import { switchMap, concatMapTo, retryWhen, delay, mergeMap } from 'rxjs/operators';
import { formatDate } from '@angular/common';

import { Asset } from '../logic/asset';
import { RANGES, STATUS } from '../logic/global_constants';
import { AppState } from '../store/app_state';
import { parseJsonToAppstate } from '../logic/parse_json_to_appstate';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private NOMICS_API_KEY = 'ec9b86934dad1c08e591ea26a861a5a3';
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
    return this.httpClient.get<any>(`https://api.nomics.com/v1/currencies/ticker?sort=rank&per-page=${length}&page=1&key=${this.NOMICS_API_KEY}`)
  }



  private getAssetsFromAPI(assets: ReadonlyArray<Asset>): Observable<ReadonlyArray<Asset>> {
    const updatedAssets: Asset[] = [];
    let retries = 3;
    return timer(this.getDelayForNextAPIRequest())
      .pipe(
        concatMapTo(this.getAllAssetsFromAPI(100)),
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
                  asset.name,
                  asset.status,
                  assetData.logo_url,
                  assetData.price,
                  assetData.first_trade,
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
    //nötig, weil nomics nur einen Request pro Sekunde verarbeitet
    let delay: number;
    const jetzt = new Date();
    if (jetzt > this.nextPossibleAPIRequest) {
      delay = 0;
      this.nextPossibleAPIRequest = new Date(new Date().getTime() + 1000);//nächstmöglicher API Request in 1s
    }
    else {
      delay = this.nextPossibleAPIRequest.getTime() - jetzt.getTime();
      this.nextPossibleAPIRequest = new Date(this.nextPossibleAPIRequest.getTime() + 1000);//nächstmöglicher API Request wird um 1s erhöht
    }
    return delay;
  }




  private getSparklinesFromAPI(assets: ReadonlyArray<Asset>): Observable<ReadonlyArray<Asset>> {
    return this.getSparklinesRangeFromAPI(assets, RANGES.day)
      .pipe(
        switchMap(assets => this.getSparklinesRangeFromAPI(assets, RANGES.week)),
        switchMap(assets => this.getSparklinesRangeFromAPI(assets, RANGES.month)),
        switchMap(assets => this.getSparklinesRangeFromAPI(assets, RANGES.year)),
        switchMap(assets => this.getSparklinesRangeFromAPI(assets, RANGES.all)),
      );
  }



  private getSparklinesRangeFromAPI(assets: ReadonlyArray<Asset>, range: number): Observable<ReadonlyArray<Asset>> {
    const updatedAssets: Asset[] = [];
    const ids = assets.filter(a => (a.status != STATUS.usd) && (a.status != STATUS.total)).map(a => a.id).reduce((total: string, cur: string) => total + "," + cur);
    const startdate = this.getStartDate(range);
    let retries = 1;
    return timer(this.getDelayForNextAPIRequest())
      .pipe(
        concatMapTo(this.httpClient.get<any>(`https://api.nomics.com/v1/currencies/sparkline?ids=${ids}&start=${startdate}&key=${this.NOMICS_API_KEY}`)),
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
              const assetData = data.find(a => asset.id === a.currency);
              if (assetData) {
                const updatedHistory = asset.history;
                updatedHistory[range].prices = assetData.prices.map(x => Number(x));
                updatedHistory[range].timestamps = assetData.timestamps.map(x => new Date(x));
                updatedHistory[range].prices.push(asset.price); //aktuellsten Preis per Hand dazu
                updatedHistory[range].timestamps.push(new Date());
                updatedAssets.push(new Asset(
                  asset.id,
                  asset.name,
                  asset.status,
                  asset.logo_url,
                  asset.price,
                  asset.first_trade,
                  updatedHistory,
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
          })
      );
  }










  private getStartDate(range: number): string {
    var temp = new Date();

    switch (range) {

      case RANGES.day: {
        temp.setDate(temp.getDate() - 1);
        break;
      }
      case RANGES.week: {
        temp.setDate(temp.getDate() - 7);
        break;
      }
      case RANGES.month: {
        temp.setDate(temp.getDate() - 28);
        break;
      }
      case RANGES.year: {
        temp.setDate(temp.getDate() - 365);
        break;
      }
      case RANGES.all: {
        temp = new Date('2011-01-01');
      }
    }
    return formatDate(temp, 'yyyy-MM-ddTHH%3Amm%3Ass', 'en-US') + "Z";
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
          newOffer.push(new Asset(d.id, d.name, STATUS.offered, d.logo_url, d.price, d.first_trade, [], [0], []));
        }
        return of(newOffer);
      })
    );
  }

}
