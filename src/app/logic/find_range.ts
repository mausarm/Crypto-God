import { Asset } from "../store/asset";
import { RANGES } from "../store/global_constants";

//findet den kürzesten Zeitraum, in dem das date noch enthalten ist
export function findRange(date: Date, asset: Asset): RANGES {
  let range = RANGES.all;
  for (let r = RANGES.all; r >= 0; r--) {
    if (asset.history[r].timestamps[0] <= date) {
      range = r;
    }
  }
  return range;
}
