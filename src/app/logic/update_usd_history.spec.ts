import { RANGES } from "./global_constants";
import { MOCK_APPSTATE } from "./mock_appstate";
import { updateUSDhistory } from "./update_usd_history";

describe('updateUSDHistory', () => {
    it('price history should be equal 1 everywhere', () => {
        expect(updateUSDhistory(MOCK_APPSTATE.assets).history[RANGES.day].prices.filter(p => p != 1)).toEqual([]);
        expect(updateUSDhistory(MOCK_APPSTATE.assets).history[RANGES.week].prices.filter(p => p != 1)).toEqual([]);
        expect(updateUSDhistory(MOCK_APPSTATE.assets).history[RANGES.month].prices.filter(p => p != 1)).toEqual([]);
        expect(updateUSDhistory(MOCK_APPSTATE.assets).history[RANGES.year].prices.filter(p => p != 1)).toEqual([]);
        expect(updateUSDhistory(MOCK_APPSTATE.assets).history[RANGES.all].prices.filter(p => p != 1)).toEqual([]);
    });
});