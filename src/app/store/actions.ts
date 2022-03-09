import { createAction, props } from '@ngrx/store';
import { Asset } from 'src/app/store/asset';
import { AppState } from './app_state';

export const addAsset = createAction(
    '[offer] Add Asset',
    props<{ newAsset: Asset }>()
);

export const buyAsset = createAction(
    '[crypto] Buy Asset',
    props<{ assetID: string }>()
);

export const sellAsset = createAction(
    '[crypto] Sell Asset',
    props<{ assetId: string }>()
);

export const chooseAsset = createAction(
    '[crypto] Choose Asset',
    props<{ assetID: string }>()
);

export const changeRange = createAction(
    '[settings] Change Range',
    props<{ range: number }>()
);

export const changeRadioButton = createAction(
    '[settings] Change RadioButton',
    props<{ value: string }>()
);

export const changeAssetOrder = createAction(
    '[main] Change Asset Order',
    props<{ moveAssetId: string, inPlaceOfAssetId: string }>()
);

export const loadState = createAction(
    '[main] Load State',
);

export const loadStateSuccess = createAction(
    '[effect] Load State Success',
    props<{ loadedState: AppState }>()
);

export const updateAssets = createAction(
    '[main] Update Assets',
);

export const updateAssetsSuccess = createAction(
    '[effect] Update Assets Success',
    props<{ updatedAssets: ReadonlyArray<Asset> }>()
);


export const findNewOffer = createAction(
    '[main] Find New Offer'
);

export const findNewOfferSuccess = createAction(
    '[effect] Find New Offer Success',
    props<{ offeredAssets: ReadonlyArray<Asset> }>()
);

export const deleteOffered = createAction(
    '[main] Delete Offered'
);


export const toggleShowSoldCryptos = createAction(
    '[main] Toggle Show Sold Cryptos'
);

export const alertNotEnoughOfAsset = createAction(
    '[effect] Not Enough Of Asset Alert',
    props<{ assetId: string }>()
);

export const alertNotEnoughOfAssetDone = createAction(
    '[effect] Not Enough Of Asset Alert Done',
);

export const errorNotification = createAction(
    '[effect] Error Notification',
    props<{ errorMessage: string }>()
);

