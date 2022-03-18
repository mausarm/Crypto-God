import { Asset } from 'src/app/store/asset';
import { ASSET_ID, RANGES, STATUS } from '../store/global_constants';
import { findRange } from './find_range';

export function calculateTotalAssets(assets: ReadonlyArray<Asset>): Asset {

  const total = assets.filter((a) => a.status === STATUS.total)[0].clone();

  calculateActualTotal();
  setTimestamps();
  clearHistory();

  for (let asset of assets.filter((a) => a.status === STATUS.owned || a.status === STATUS.usd)) {
    addHistoryOf(asset);
  }

  return total;


  function calculateActualTotal(): void {

    total.amount_history[0] = 0;
    for (let asset of assets.filter((a) => a.status === STATUS.owned || a.status === STATUS.usd)) {
      total.amount_history[0] +=
        asset.amount_history[asset.amount_history.length - 1] * asset.price;
    }
  }


  function setTimestamps(): void {

    for (let range = 0; range <= RANGES.all; range++) {
      total.history[range].timestamps = assets.filter((a) => a.id === ASSET_ID.bitcoin)[0].history[range].timestamps.slice();
    }

    //History[all] auf entsprechenden Ausschnitt setzen
    total.history[RANGES.all].timestamps = total.history[findRange(total.first_trade, total)].timestamps.filter((d) => d >= total.first_trade);

    //StartTimestamp in History[all] per Hand setzen
    total.history[RANGES.all].timestamps.unshift(total.first_trade);
  }


  function clearHistory(): void {

    for (let range = 0; range <= RANGES.all; range++) {
      total.history[range].prices = total.history[range].timestamps.map((d, i) => {
        if (range === RANGES.all && i === 0) {
          if (!total.history[RANGES.all].prices[0]) {
            //beim ersten Mal aktuellen Wert als Startwert setzen
            return total.amount_history[0];
          }
          else {
            //ansonsten Startwert als ersten Wert beibehalten
            return total.history[RANGES.all].prices[0];
          }
        }
        else {
          return 0;
        }
      });
    }
  }


  function addHistoryOf(asset: Asset): void {

    for (let range = 0; range <= RANGES.all; range++) {
      for (let historyIndex = 0; historyIndex < total.history[range].timestamps.length; historyIndex++) {
        //bei History(all) den ersten Wert (Startwert) überspringen
        if (range === RANGES.all && historyIndex === 0) {
          historyIndex = 1;
        }

        const priceDataRange = findRange(total.history[range].timestamps[historyIndex], asset)
        //den damaligen Amount und den Preis des Assets finden
        const indexOfAmount = asset.amount_timestamps.map(
          (d) => (d <= total.history[range].timestamps[historyIndex])
        ).lastIndexOf(true);

        let indexOfPrice = asset.history[priceDataRange].timestamps.map(
          (d) => (d <= total.history[range].timestamps[historyIndex])
        ).lastIndexOf(true);

        //wenn der erste Amount schon in der Zukunft liegt
        //oder gar keine Amounts im Array sind, dann passiert nichts
        if (indexOfAmount === -1 || asset.amount_timestamps.length === 0) {
        }
        else {
          //Wenn Datum des Total-Eintrags älter ist als alle History-Einträge
          //dann ältesten bekannten Preis nehmen
          if (indexOfPrice === -1) {
            indexOfPrice = 0;
          }
            total.history[range].prices[historyIndex] +=
              asset.amount_history[indexOfAmount] * asset.history[priceDataRange].prices[indexOfPrice];
        }
      }
    }
  }



}
