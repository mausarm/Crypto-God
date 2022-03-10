import { Asset } from 'src/app/store/asset';
import { ASSET_ID, RANGES, STATUS } from '../store/global_constants';

export function updateUSDhistory(assets: ReadonlyArray<Asset>): Asset {
  //Der Preisverlauf von USD auf konstant 1 setzen
  const usd = assets.find((a) => a.status === STATUS.usd).clone();
  for (let range = 0; range <= RANGES.all; range++) {
    usd.history[range].timestamps =
      assets.find((a) => a.id === ASSET_ID.bitcoin).history[range].timestamps.slice(); //Timestamps orientieren sich an BTC
    usd.history[range].prices = [];
    for (let i = 0; i < usd.history[range].timestamps.length; i++) {
      usd.history[range].prices.push(1);
    }
  }
  return usd;
}
