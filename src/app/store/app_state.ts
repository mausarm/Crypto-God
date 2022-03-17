import { Quest } from 'src/app/store/quest';
import { Asset } from './asset';


export interface AppState {
    assets: ReadonlyArray<Asset>;
    uiState: UiState;
    offerState: OfferState;
    quest: Quest;
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

