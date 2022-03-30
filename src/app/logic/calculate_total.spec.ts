import { RANGES } from "../store/global_constants";
import { MOCK_APPSTATE, SIMPLE_MOCKASSETS } from "../store/mock_appstate";
import { calculateTotalAssets } from "./calculate_total";

describe('calculateTotalAssets', () => {

  it('should calculate correct total history of simple mockassets', () => {
    expect(withoutLastTimestamps(calculateTotalAssets(SIMPLE_MOCKASSETS).history))
      .toEqual(withoutLastTimestamps(SIMPLE_MOCKASSETS[0].history));
    //der letzte Timestamp wird aktuell gesetzt, deshalb hier weggelassen
  });

  it('should calculate correct total history of mockassets', () => {
    expect(withoutLastTimestamps(calculateTotalAssets(MOCK_APPSTATE.assets).history)).toEqual(withoutLastTimestamps((MOCK_APPSTATE.assets)[0].history));
  });

  it('should hold the same last price in any history', () => {
    const total = calculateTotalAssets(SIMPLE_MOCKASSETS);

    expect(total.history[RANGES.day].prices[total.history[RANGES.day].prices.length - 1])
      .withContext("compare day to all")
      .toEqual(total.history[RANGES.all].prices[total.history[RANGES.all].prices.length - 1]);

    expect(total.history[RANGES.day].prices[total.history[RANGES.day].prices.length - 1])
      .withContext("compare day to amount_history")
      .toEqual(total.amount_history[0]);
  });
});

function withoutLastTimestamps(history: any[]): any[] {
  return history.map(x => {
    return { prices: x.prices, timestamps: x.timestamps.slice(0, -1) }
  });
}
