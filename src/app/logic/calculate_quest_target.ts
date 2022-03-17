import { Asset } from "../store/asset";
import { ASSET_ID, QUEST_TYPE } from "../store/global_constants";
import { Quest } from "../store/quest";

export function calculateQuestTarget(quest: Quest, assets: ReadonlyArray<Asset>): number {

  let result = -1;

  switch (quest.type) {
    case QUEST_TYPE.gainTotal:
      result = quest.target; //Target ändert sich nicht bei gainTotal
      break;
  }

  return result;
}
