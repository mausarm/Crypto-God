import { Asset } from 'src/app/store/asset';
import { AppState } from '../store/app_state';
import { INITIAL_ASSETS, INITIAL_OFFER_STATE, INITIAL_QUEST, INITIAL_UI_STATE } from '../store/initial_state';
import { Quest } from '../store/quest';

export function parseJsonToAppstate(json: string): AppState {
  const appState: AppState = {
    assets: INITIAL_ASSETS,
    uiState: { ...INITIAL_UI_STATE },
    offerState: { ...INITIAL_OFFER_STATE },
    quest: INITIAL_QUEST
  };
  const d = JSON.parse(json);

  try {


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
    );


    appState.uiState.chosenAssetId = d.uiState.chosenAssetId ?? INITIAL_UI_STATE.chosenAssetId;
    appState.uiState.range = +d.uiState.range ?? INITIAL_UI_STATE.range;
    appState.uiState.radioChecked = d.uiState.radioChecked ?? INITIAL_UI_STATE.radioChecked;
    appState.uiState.isLoading = d.uiState.isLoading ?? INITIAL_UI_STATE.isLoading;
    appState.uiState.showSoldCryptos = <boolean>d.uiState.showSoldCryptos ?? INITIAL_UI_STATE.showSoldCryptos;
    appState.uiState.alertAssetId = d.uiState.alertAssetId ?? INITIAL_UI_STATE.alertAssetId;
    appState.uiState.errorMessage = d.uiState.errorMessage ?? INITIAL_UI_STATE.errorMessage;



    try{
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
    catch(error){
      appState.offerState.lastNewAsset = null;
    }

    appState.offerState.nextNewAssetDate = new Date(d.offerState.nextNewAssetDate ?? INITIAL_OFFER_STATE.nextNewAssetDate);


    appState.quest = new Quest(
      d.quest.type,
      d.quest.duration,
      d.quest.status,
      d.quest.endTime,
      d.quest.startAssets,
      d.quest.score,
      d.quest.target
    );
  }
  catch (error) {
    console.log("corrupt local storage state: "+error);
    console.log(d);
    appState.assets = INITIAL_ASSETS;
    appState.uiState = INITIAL_UI_STATE;
    appState.offerState = INITIAL_OFFER_STATE;
    appState.quest = INITIAL_QUEST;
  };

  return appState;
}
