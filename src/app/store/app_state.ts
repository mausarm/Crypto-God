import { Quest } from 'src/app/logic/quest';
import { Asset } from '../logic/asset';


export interface AppState {
    assets: ReadonlyArray<Asset>;
    uiState: UiState;
    offerState: OfferState;
    questState: QuestState;
}

export interface UiState {
    chosenAssetId: string;
    range: number;
    radioChecked: string;
    isLoading: boolean;
    showSoldCryptos: boolean;
    alertAssetId: string;
    errorMessage: string;
}

export interface OfferState {
    lastNewAsset: Asset;
    nextNewAssetDate: Date;
}

export interface QuestState {
    quest: Quest;
}