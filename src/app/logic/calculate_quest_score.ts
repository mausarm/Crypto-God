import { Asset } from "../store/asset";
import { ASSET_ID, QUEST_TYPE } from "../store/global_constants";
import { Quest } from "../store/quest";

export function calculateQuestScore(quest: Quest, assets: ReadonlyArray<Asset>): number {

  let result = -1;

  switch (quest.type) {
    case QUEST_TYPE.gainTotal:
      const total = assets.find(a => a.id === ASSET_ID.total).amount_history[0]; //TODO: was, wenn endTime überschritten?
      const startTotal = quest.startAssets.find(a => a.id === ASSET_ID.total).amount_history[0];
      result = total - startTotal;
      break;
  }

  return result;
}
