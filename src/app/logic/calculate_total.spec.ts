import { RANGES } from "../store/global_constants";
import { MOCK_APPSTATE, SIMPLE_MOCKASSETS } from "../store/mock_appstate";
import { calculateTotalAssets } from "./calculate_total";

describe('calculateTotalAssets', () => {

  it('should calculate correct total history of simple mockassets', () => {
    expect(calculateTotalAssets(SIMPLE_MOCKASSETS).history).toEqual(SIMPLE_MOCKASSETS[0].history);
  });

  it('should calculate correct total history of mockassets', () => {
    expect(calculateTotalAssets(MOCK_APPSTATE.assets).history).toEqual((MOCK_APPSTATE.assets)[0].history);
  });

  it('should hold the same last price in any history', () => {
    const total = calculateTotalAssets(SIMPLE_MOCKASSETS);
    expect(total.history[RANGES.day].prices.pop()).toEqual(total.history[RANGES.all].prices.pop());
    expect(total.history[RANGES.day].prices.pop()).toEqual(total.amount_history[0]);
  });
});
