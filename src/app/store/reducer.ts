import { createReducer, on, Action } from '@ngrx/store';
import { INITIAL_ASSETS, INITIAL_UI_STATE, INITIAL_OFFER_STATE, INITIAL_QUEST } from 'src/app/store/initial_state';
import * as fromActions from 'src/app/store/actions';
import { QUEST_STATUS, QUEST_TYPE, RADIOCHECKED, STATUS } from './global_constants';
import { calculateTotalAssets } from '../logic/calculate_total';
import { mergedInto } from '../logic/merged_into';
import { Quest } from './quest';
import { calculateQuestScore } from '../logic/calculate_quest_score';
import { calculateQuestTarget } from '../logic/calculate_quest_target';



export const assetReducer = createReducer(
  INITIAL_ASSETS,

  on(fromActions.updateAssetsSuccess, (assets, { updatedAssets }) => {
    return mergedInto(updatedAssets, assets);
  }),

  on(fromActions.addAsset, (assets, { newAsset }) => {
    return assets.map((a) => {
      if (a.status != STATUS.total) {
        return a.clone();
      }
      else {
        return calculateTotalAssets([...assets, newAsset]);
      }
    }).concat(newAsset);
  }),

  on(fromActions.buyAsset, (assets, { assetID }) => {

    const usd = assets.find((a) => a.status === STATUS.usd).clone();
    const assetToBuy = assets.find((a) => a.id === assetID).clone();
    //wenn noch 1000USD vorhanden sind, dann wird im Wert von 1000USD gekauft
    if (usd.amount_history[usd.amount_history.length - 1] >= 1000) {
      assetToBuy.amount_history.push(assetToBuy.amount_history[assetToBuy.amount_history.length - 1] + (1000 / assetToBuy.price));
      usd.amount_history.push(usd.amount_history[usd.amount_history.length - 1] - 1000);
    }
    //ansonsten werden alle restlichen USD investiert
    else {
      assetToBuy.amount_history.push(assetToBuy.amount_history[assetToBuy.amount_history.length - 1] + (usd.amount_history[usd.amount_history.length - 1] / assetToBuy.price));
      usd.amount_history.push(0);
    }

    //wenn erster Buy-Sell-Vorgang oder
    //seit dem letzten BuySell-Vorgang mehr als eine Minute vergangen ist,
    //dann neuen Eintrag in die Amount-Timestamps
    if ((assetToBuy.amount_timestamps.length === 0) ||
      (assetToBuy.amount_timestamps[assetToBuy.amount_timestamps.length - 1].getTime() < new Date().getTime() - 60000)) {
      assetToBuy.amount_timestamps.push(new Date());
      usd.amount_timestamps.push(new Date());
    }
    //wenn nicht, dann die vorigen Amounts aus der History löschen
    else {
      assetToBuy.amount_history.splice(assetToBuy.amount_history.length - 2, 1);
      usd.amount_history.splice(usd.amount_history.length - 2, 1);
    }

    return assets.map((a) => {
      if (a.status === STATUS.usd) {
        return usd;
      }
      else if (a.id === assetID) {
        return assetToBuy;
      }
      else {
        return a.clone();
      }
    })

  }),

  on(fromActions.sellAsset, (assets, { assetId: assetID }) => {

    const usd = assets.find((a) => a.status === STATUS.usd).clone();
    const assetToSell = assets.find((a) => a.id === assetID).clone();

    //wenn noch Asset im Wert von über 1000USD vorhanden ist, dann wird im Wert von 1000USD verkauft
    if (assetToSell.amount_history[assetToSell.amount_history.length - 1] * assetToSell.price > 1000) {
      assetToSell.amount_history.push(assetToSell.amount_history[assetToSell.amount_history.length - 1] - (1000 / assetToSell.price));
      usd.amount_history.push(usd.amount_history[usd.amount_history.length - 1] + 1000);
    }
    //wenn weniger vorhanden ist, dann wird der Rest verkauft
    else {
      usd.amount_history.push(usd.amount_history[usd.amount_history.length - 1] + assetToSell.amount_history[assetToSell.amount_history.length - 1] * assetToSell.price);
      assetToSell.amount_history.push(0);
    }
    //wenn erster Buy-Sell Vorgang  oder
    //seit dem letzten BuySell-Vorgang mehr als eine Minute vergangen ist,
    //dann neuen Eintrag in die Amount-Timestamps
    if ((assetToSell.amount_timestamps.length === 0) ||
      (assetToSell.amount_timestamps[assetToSell.amount_timestamps.length - 1].getTime() < new Date().getTime() - 60000)) {
      assetToSell.amount_timestamps.push(new Date());
      usd.amount_timestamps.push(new Date());
    }
    //wenn nicht, dann die vorigen Amounts aus der History löschen
    else {
      assetToSell.amount_history.splice(assetToSell.amount_history.length - 2, 1);
      usd.amount_history.splice(usd.amount_history.length - 2, 1);
    }

    return assets.map((a) => {
      if (a.status === STATUS.usd) {
        return usd;
      }
      else if (a.id === assetID) {
        return assetToSell;
      }
      else {
        return a.clone();
      }
    })
  }),

  on(fromActions.changeAssetOrder, (assets, { moveAssetId, inPlaceOfAssetId }) => {
    const before: number = assets.findIndex((a) => a.id === moveAssetId);
    const after: number = assets.findIndex((a) => a.id === inPlaceOfAssetId);
    if (before < after) {
      return assets.slice(0, before).concat(assets.slice(before + 1, after + 1)).concat(assets[before]).concat(assets.slice(after + 1, assets.length))
    }
    else {
      return assets.slice(0, after).concat(assets[before]).concat(assets.slice(after, before)).concat(assets.slice(before + 1, assets.length))
    }
  }),

  on(fromActions.loadStateSuccess, (assets, { loadedState }) => {
    return loadedState.assets;
  }),

  on(fromActions.findNewOfferSuccess, (assets, { offeredAssets }) => {
    return assets.concat(offeredAssets);
  }),

  on(fromActions.deleteOffered, (assets, { }) => {
    return assets.filter((a) => a.status != STATUS.offered);
  }),


);













export const uiStateReducer = createReducer(
  INITIAL_UI_STATE,

  on(fromActions.loadStateSuccess, (uiState, { loadedState }) => ({
    ...loadedState.uiState,
    radioChecked: RADIOCHECKED.none
  })),

  on(fromActions.updateAssetsSuccess, (uiState, { updatedAssets }) => ({
    ...uiState,
    isLoading: false,
    errorMessage: ""
  })),

  on(fromActions.chooseAsset, (uiState, { assetID }) => ({
    ...uiState,
    chosenAssetId: assetID,
    radioChecked: uiState.range.toString()
  })),

  on(fromActions.changeAssetOrder, (uiState, { moveAssetId, inPlaceOfAssetId }) => ({
    ...uiState,
    chosenAssetId: moveAssetId,
    radioChecked: uiState.range.toString()
  })),

  on(fromActions.buyAsset, (uiState, { assetID }) => ({
    ...uiState,
    chosenAssetId: assetID,
    radioChecked: uiState.range.toString()
  })),

  on(fromActions.addAsset, (uiState, { newAsset }) => ({
    ...uiState,
    chosenAssetId: newAsset.id
  })),

  on(fromActions.sellAsset, (uiState, { assetId: assetID }) => ({
    ...uiState,
    chosenAssetId: assetID,
    radioChecked: uiState.range.toString()
  })),

  on(fromActions.changeRange, (uiState, { range }) => ({
    ...uiState,
    range: range
  })),

  on(fromActions.changeRadioButton, (uiState, { value }) => ({
    ...uiState,
    radioChecked: value
  })),

  on(fromActions.toggleShowSoldCryptos, (uiState, { }) => ({
    ...uiState,
    showSoldCryptos: !uiState.showSoldCryptos
  })),

  on(fromActions.alertNotEnoughOfAsset, (uiState, { assetId }) => ({
    ...uiState,
    alertAssetId: assetId
  })),

  on(fromActions.alertNotEnoughOfAssetDone, (uiState, { }) => ({
    ...uiState,
    alertAssetId: ""
  })),

  on(fromActions.errorNotification, (uiState, { errorMessage }) => ({
    ...uiState,
    errorMessage: errorMessage
  })),

);












export const offerStateReducer = createReducer(
  INITIAL_OFFER_STATE,

  on(fromActions.loadStateSuccess, (offerState, { loadedState }) => ({
    ...loadedState.offerState
  })),

  on(fromActions.findNewOfferSuccess, (offerState, { offeredAssets }) => ({
    ...offerState,
    nextNewAssetDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
  })),

  on(fromActions.addAsset, (offerState, { newAsset }) => ({
    ...offerState,
    lastNewAsset: newAsset
  })),

);

export const questReducer = createReducer(
  INITIAL_QUEST,

  on(fromActions.startQuest, (quest, { startAssets }) => {

    const result: Quest = {
      ...quest,
      status: QUEST_STATUS.active,
      endTime: new Date(new Date().getTime() + quest.duration),
      startAssets: startAssets
    };

    switch (quest.type) {
      case QUEST_TYPE.gainTotal:
        result.score = 0;
        result.target = 10;
        break;
    }

    return result;
  }),

  on(fromActions.updateAssetsSuccess, (quest, { updatedAssets }) => {

    const result: Quest = { ...quest };

    if (quest.status === QUEST_STATUS.active) {
      result.score = calculateQuestScore(quest, updatedAssets);
      result.target = calculateQuestTarget(quest, updatedAssets);
    }

    return result;
  }),
);
