import { Asset } from "../store/asset";
import { ASSET_ID, QUEST_TYPE } from "../store/global_constants";
import { Quest } from "../store/quest";

export function calculateQuestScore(quest: Quest, updatedAssets: ReadonlyArray<Asset>): number {

  let result = -1;

  switch (quest.type) {
    case QUEST_TYPE.gainTotal:
      const updatedTotal = updatedAssets.find(a => a.id === ASSET_ID.total).amount_history[0];
      const startTotal = quest.startAssets.find(a => a.id === ASSET_ID.total).amount_history[0];
      result = updatedTotal - startTotal;
      break;
  }

  console.log(updatedAssets);
  console.log(quest.startAssets);

  return result;
}
