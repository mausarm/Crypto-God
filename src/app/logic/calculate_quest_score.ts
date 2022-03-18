import { Asset } from "../store/asset";
import { ASSET_ID, QUEST_TYPE } from "../store/global_constants";
import { Quest } from "../store/quest";
import { findRange } from "./find_range";

export function calculateQuestScore(quest: Quest, assets: ReadonlyArray<Asset>): number {

  let result = -1;

  switch (quest.type) {
    case QUEST_TYPE.gainTotal:
      const total = getPriceAfter(assets.find(a => a.id === ASSET_ID.total), quest.endTime);
      const startTotal = quest.startAssets.find(a => a.id === ASSET_ID.total).amount_history[0];
      result = total - startTotal;
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
