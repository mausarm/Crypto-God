import { Asset } from './asset';
import { RADIOCHECKED, RANGES, STATUS } from './global_constants';

export const INITIAL_ASSETS: ReadonlyArray<Asset> = [
        new Asset(
            'TOTAL',
            'TOTAL',
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
            'USD',
            'USD',
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
            'bitcoin',
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
    chosenAssetId: "bitcoin",
    range: RANGES.month,
    radioChecked: RADIOCHECKED.none,
    isLoading: true,
    showSoldCryptos: true,
    alertAssetId: "",
    errorMessage: ""
}

export const INITIAL_OFFER_STATE = {
    lastNewAsset: undefined,
    nextNewAssetDate: new Date(0) //undefined besser
}

export const INITIAL_QUEST_STATE = {
    quest: undefined
}

export const INITIAL_APP_STATE = {
    assets: INITIAL_ASSETS,
    uiState: INITIAL_UI_STATE,
    offerState: INITIAL_OFFER_STATE,
    questState: INITIAL_QUEST_STATE
}
