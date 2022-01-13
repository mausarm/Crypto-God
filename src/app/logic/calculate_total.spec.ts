import { MOCK_APPSTATE, SIMPLE_MOCKASSETS } from "./mock_appstate";
import { calculateTotalAssets } from "./calculate_total";

describe('calculateTotalAssets', () => {
  console.log(SIMPLE_MOCKASSETS[0]);
  console.log(SIMPLE_MOCKASSETS[1]);
  console.log(SIMPLE_MOCKASSETS[2]);

  it('should calculate correct total history of simple mockassets', () => {
    expect(calculateTotalAssets(SIMPLE_MOCKASSETS).history).toEqual(SIMPLE_MOCKASSETS[0].history);
  });

  it('should calculate correct total history of mockassets', () => {
    expect(calculateTotalAssets(MOCK_APPSTATE.assets).history).toEqual((MOCK_APPSTATE.assets)[0].history);
  });

});
