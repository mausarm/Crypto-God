import { MOCK_APPSTATE, SIMPLE_MOCKASSETS } from "../store/mock_appstate";
import { calculateTotalAssets } from "./calculate_total";

describe('calculateTotalAssets', () => {

  it('should calculate correct total history of simple mockassets', () => {
    expect(calculateTotalAssets(SIMPLE_MOCKASSETS).history).toEqual(SIMPLE_MOCKASSETS[0].history);
  });

  it('should calculate correct total history of mockassets', () => {
    expect(calculateTotalAssets(MOCK_APPSTATE.assets).history).toEqual((MOCK_APPSTATE.assets)[0].history);
  });

});
