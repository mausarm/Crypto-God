import { Asset } from './asset';
import { ASSET_ID, QUEST_DURATION, QUEST_STATUS, QUEST_TYPE, RADIOCHECKED, RANGES, STATUS } from './global_constants';
import { Quest } from './quest';

export const INITIAL_ASSETS: ReadonlyArray<Asset> = [
        new Asset(
            ASSET_ID.total,
            ASSET_ID.total,
            'Total Assets',
            STATUS.total,
            '../../../assets/dollaricon.png',
            1,
            new Date(),
            [{ prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }],
            [0],
            [new Date()]
        ),
        new Asset(
            ASSET_ID.usd,
            ASSET_ID.usd,
            'US Dollar',
            STATUS.usd,
            '../../../assets/dollaricon.png',
            1,
            null,
            [{ prices: [1], timestamps: [] }, { prices: [1], timestamps: [] }, { prices: [1], timestamps: [] }, { prices: [1], timestamps: [] }, { prices: [1], timestamps: [] }],
            [0],
            [new Date()]
        ),
        new Asset(
            ASSET_ID.bitcoin,
            'btc',
            'Bitcoin',
            STATUS.owned,
            '',
            0,
            null,
            [{ prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }],
            [1],
            [new Date()]
        ),
        new Asset(
            'ethereum',
            'eth',
            'Ethereum',
            STATUS.owned,
            '',
            0,
            null,
            [{ prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }, { prices: [], timestamps: [] }],
            [10],
            [new Date()]
        )
    ]


export const INITIAL_UI_STATE = {
    chosenAssetId: ASSET_ID.total,
    range: RANGES.month,
    radioChecked: RADIOCHECKED.none,
    isLoading: true,
    showSoldCryptos: true,
    alertAssetId: "",
    errorMessage: ""
}

export const INITIAL_OFFER_STATE = {
    lastNewAsset: null,
    nextNewAssetDate: new Date(0) //null besser?
}

export const INITIAL_QUEST = new Quest(QUEST_TYPE.gainTotal, QUEST_DURATION.tenMin, QUEST_STATUS.prestart, new Date(0), [], 0, 0)


export const INITIAL_APP_STATE = {
    assets: INITIAL_ASSETS,
    uiState: INITIAL_UI_STATE,
    offerState: INITIAL_OFFER_STATE,
    quest: INITIAL_QUEST
}
