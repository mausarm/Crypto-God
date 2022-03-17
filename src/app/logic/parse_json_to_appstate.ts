import { Asset } from 'src/app/store/asset';
import { AppState } from '../store/app_state';
import { INITIAL_ASSETS, INITIAL_OFFER_STATE, INITIAL_QUEST, INITIAL_UI_STATE } from '../store/initial_state';
import { Quest } from '../store/quest';

export function parseJsonToAppstate(json: string): AppState {
  const appState: AppState = {
    assets: INITIAL_ASSETS,
    uiState: { ...INITIAL_UI_STATE },
    offerState: { ...INITIAL_OFFER_STATE },
    quest: { ...INITIAL_QUEST }
  };
  const d = JSON.parse(json);

  if (d && d.assets[0].symbol) {
    //Beim Übergang von Nomics zu CoinGecko ist ein neues Feld eingepflegt, nämlich asset.symbol
    //Falls dieses nicht im JSON war, dann wird appState resetted

    if (d.assets) {

      appState.assets = d.assets.map(a =>
        new Asset(
          a.id,
          a.symbol,
          a.name,
          a.status,
          a.logo_url,
          a.price,
          a.first_trade,
          a.history,
          a.amount_history,
          a.amount_timestamps)
      )
    };

    if (d.uiState) {
      appState.uiState.chosenAssetId = d.uiState.chosenAssetId ?? INITIAL_UI_STATE.chosenAssetId;
      appState.uiState.range = +d.uiState.range ?? INITIAL_UI_STATE.range;
      appState.uiState.radioChecked = d.uiState.radioChecked ?? INITIAL_UI_STATE.radioChecked;
      appState.uiState.isLoading = d.uiState.isLoading ?? INITIAL_UI_STATE.isLoading;
      appState.uiState.showSoldCryptos = <boolean>d.uiState.showSoldCryptos ?? INITIAL_UI_STATE.showSoldCryptos;
      appState.uiState.alertAssetId = d.uiState.alertAssetId ?? INITIAL_UI_STATE.alertAssetId;
      appState.uiState.errorMessage = d.uiState.errorMessage ?? INITIAL_UI_STATE.errorMessage;
    }

    if (d.offerState) {
      if (d.offerState.lastNewAsset) {
        appState.offerState.lastNewAsset = new Asset(
          d.offerState.lastNewAsset.id,
          d.offerState.lastNewAsset.symbol,
          d.offerState.lastNewAsset.name,
          d.offerState.lastNewAsset.status,
          d.offerState.lastNewAsset.logo_url,
          d.offerState.lastNewAsset.price,
          d.offerState.lastNewAsset.first_trade,
          d.offerState.lastNewAsset.history,
          d.offerState.lastNewAsset.amount_history,
          d.offerState.lastNewAsset.amount_timestamps);
      }
      appState.offerState.nextNewAssetDate = new Date(d.offerState.nextNewAssetDate ?? INITIAL_OFFER_STATE.nextNewAssetDate);
    }

    if (d.quest) {
      appState.quest = new Quest(
        d.quest.type,
        Number(d.quest.duration),
        d.quest.status,
        new Date(d.quest.endTime),
        d.quest.startAssets.map(a =>
          new Asset(
            a.id,
            a.symbol,
            a.name,
            a.status,
            a.logo_url,
            a.price,
            a.first_trade,
            a.history,
            a.amount_history,
            a.amount_timestamps)
        ),
        Number(d.quest.score),
        Number(d.quest.target)
      )
    }
  }

  return appState;
}
