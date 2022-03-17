import { Asset } from "../store/asset";
import { ASSET_ID, QUEST_TYPE } from "../store/global_constants";
import { Quest } from "../store/quest";

export function calculateQuestTarget(quest: Quest, updatedAssets: ReadonlyArray<Asset>): number {

  let result = -1;

  switch (quest.type) {
    case QUEST_TYPE.gainTotal:
      result = 10;
      break;
  }

  return result;
}
