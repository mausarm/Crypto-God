import { INITIAL_ASSETS } from "../store/initial_state";
import { MOCK_APPSTATE } from "./mock_appstate";
import { mergedInto } from "./merged_into";

describe('mergedInto', () => {
    it('should keep the arrays length if mockassets merged into', () => {
        expect(mergedInto(MOCK_APPSTATE.assets, INITIAL_ASSETS).length).toEqual(INITIAL_ASSETS.length);
    });

    it('should overwrite the BTC history if mockassets merged into', () => {
        expect(mergedInto(MOCK_APPSTATE.assets, INITIAL_ASSETS)[2].history).toEqual(MOCK_APPSTATE.assets[2].history)
    });

});