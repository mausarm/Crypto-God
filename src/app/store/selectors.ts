import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState, UiState, OfferState, QuestState } from 'src/app/store/app_state';
import { Asset } from 'src/app/store/asset';
import { STATUS } from "./global_constants";

export const selectAssets = createFeatureSelector< ReadonlyArray<Asset>>('assets');

export const selectUiState = createFeatureSelector< UiState>('uiState');

export const selectOfferState = createFeatureSelector< OfferState>('offerState');

export const selectQuestState = createFeatureSelector< QuestState>('questState');


export const selectAppState = createSelector(
  (appState: AppState) => appState,
  (appState: AppState) => appState
);

export const selectShownAssets = createSelector(
  selectAssets,
  selectUiState,
  (assets: ReadonlyArray<Asset>, uiState: UiState) => assets.filter((a) =>
    a.status === STATUS.total ||
    a.status === STATUS.usd ||
    (a.status != STATUS.offered && (uiState.showSoldCryptos || a.amount_history[a.amount_history.length - 1] > 0))
  )
);

export const selectUnofferedAssets = createSelector(
  selectAssets,
  (assets: ReadonlyArray<Asset>) => assets.filter((a) => a.status != STATUS.offered)
);

export const selectOfferedAssets = createSelector(
  selectAssets,
  (assets: ReadonlyArray<Asset>) => assets.filter((a) => a.status === STATUS.offered)
);

export const selectSoldAssets = createSelector(
  selectAssets,
  (assets: ReadonlyArray<Asset>) => assets.filter((a) =>
    (a.status === STATUS.owned) &&
    (a.amount_history[a.amount_history.length - 1] === 0)
  )
);


export const selectChosenAsset = createSelector(
  selectAssets,
  selectUiState,
  (assets: ReadonlyArray<Asset>, uiState: UiState) => assets.filter((a) => a.id == uiState.chosenAssetId)[0]
);

export const selectRange = createSelector(
  selectUiState,
  (uiState: UiState) => uiState.range
);

export const selectRadioChecked = createSelector(
  selectUiState,
  (uiState: UiState) => uiState.radioChecked
);

export const selectIsLoading = createSelector(
  selectUiState,
  (uiState: UiState) => uiState.isLoading
);

export const selectShowSoldCryptos = createSelector(
  selectUiState,
  (uiState: UiState) => uiState.showSoldCryptos
);



export const selectLastNewAsset = createSelector(
  selectOfferState,
  (offerState: OfferState) => offerState.lastNewAsset
);

export const selectNextNewAssetDate = createSelector(
  selectOfferState,
  (offerState: OfferState) => offerState.nextNewAssetDate
);

export const selectAlertAssetId = createSelector(
  selectUiState,
  (uiState: UiState) => uiState.alertAssetId
);

export const selectErrorMessage = createSelector(
  selectUiState,
  (uiState: UiState) => uiState.errorMessage
);

export const selectQuest = createSelector(
  selectQuestState,
  (questState: QuestState) => questState.quest
);
