import { INITIAL_APP_STATE } from "../store/initial_state";
import { MOCK_APPSTATE } from "./mock_appstate";
import { parseJsonToAppstate } from "./parse_json_to_appstate";

describe('parseJsonToAppstate', () => {
    it('should return INITIAL_APPSTATE if called with empty json', () => {
        expect(parseJsonToAppstate("{}")).toEqual(INITIAL_APP_STATE);
    });

    it('should return INITIAL_APPSTATE if called with INITIAL_APPSTATE json', () => {
        expect(parseJsonToAppstate(JSON.stringify(INITIAL_APP_STATE))).toEqual(INITIAL_APP_STATE);
    });

    it('should return MOCK_APPSTATE if called with MOCK_APPSTATE json', () => {
        expect(parseJsonToAppstate(JSON.stringify(MOCK_APPSTATE))).toEqual(MOCK_APPSTATE);
    });


});