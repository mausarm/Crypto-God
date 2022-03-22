import { Asset } from "../store/asset";
import { ASSET_ID, OFFER_VALUE, QUEST_TYPE, STATUS } from "../store/global_constants";
import { Quest } from "../store/quest";
import { findRange } from "./find_range";

export function calculateQuestScore(quest: Quest, assets: ReadonlyArray<Asset>): number {

  let result = -1;
  let total = getPriceAfter(assets.find(a => a.id === ASSET_ID.total), quest.endTime);
  //falls zwischendurch Offers angenommen wurden, werden diese Gewinne abgezogen
  total -= (assets.filter(a => a.status === STATUS.owned).length - quest.startAssets.filter(a => a.status === STATUS.owned).length) * OFFER_VALUE;
  const startTotal = quest.startAssets.find(a => a.id === ASSET_ID.total).amount_history[0];

  switch (quest.type) {
    case QUEST_TYPE.gainTotal:
      result = total - startTotal;
      break;
    case QUEST_TYPE.beatBitcoin:
      result = (total / startTotal - 1) * 100;
      break;
    case QUEST_TYPE.beatAverage:
      result = (total / startTotal - 1) * 100;
      break;
    case QUEST_TYPE.beatHodler:
      result = (total / startTotal - 1) * 100;
      break;

  }

  return result;

}




function getPriceAfter(asset: Asset, date: Date): number {
  const priceDataRange = findRange(date, asset);
  let indexOfPrice = asset.history[priceDataRange].timestamps.map((d) => (d >= date)).indexOf(true);
  if (indexOfPrice === -1) {
    indexOfPrice = asset.history[priceDataRange].prices.length - 1;
  }
  return asset.history[priceDataRange].prices[indexOfPrice];
}
