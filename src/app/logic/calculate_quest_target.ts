import { Asset } from "../store/asset";
import { ASSET_ID, QUEST_TYPE, STATUS } from "../store/global_constants";
import { Quest } from "../store/quest";

export function calculateQuestTarget(quest: Quest, assets: ReadonlyArray<Asset>): number {

  let result = -1;
  const startOwnedAssets = quest.startAssets.filter(a => a.status === STATUS.owned);

  switch (quest.type) {
    case QUEST_TYPE.gainTotal:
      result = quest.target; //Target ändert sich nicht bei gainTotal
      break;

    case QUEST_TYPE.beatBitcoin:
      const startBitcoinPrice = quest.startAssets.find(a => a.id === ASSET_ID.bitcoin).price;
      const bitcoinPrice = assets.find(a => a.id === ASSET_ID.bitcoin).price;
      result = (bitcoinPrice / startBitcoinPrice - 1) * 100;
      break;

    case QUEST_TYPE.beatAverage:
      const startAverage = startOwnedAssets.reduce((priceSum, startAsset) => priceSum + startAsset.price, 0);
      const average = startOwnedAssets.reduce((priceSum, startAsset) => priceSum + assets.find(a => a.id == startAsset.id).price, 0);
      result = (average / startAverage - 1) * 100;
      break;

    case QUEST_TYPE.beatHodler:

      const startTotal = quest.startAssets.find(a => a.id === ASSET_ID.total).amount_history[0];
      const hodleTotal = startOwnedAssets.reduce((hodleSum, startAsset) => {
        const asset = assets.find(a => a.id == startAsset.id);
        const startAssetAmount = startAsset.amount_history[startAsset.amount_history.length - 1];
        return hodleSum + startAssetAmount * asset.price;
      }, 0);
      result = (hodleTotal / startTotal - 1) * 100;
      break;

  }

  return result;
}
