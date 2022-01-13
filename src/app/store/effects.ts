import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, exhaustMap, switchMap, catchError, withLatestFrom, tap, delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { DataService } from 'src/app/services/data.service';
import * as fromActions from 'src/app/store/actions';
import * as fromSelectors from 'src/app/store/selectors';
import { STATUS } from '../logic/global_constants';

@Injectable()
export class Effects {

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private store: Store
    ) { }


    loadState$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.loadState),
            switchMap(action => this.dataService.loadState()
                .pipe(
                    map(loadedState => fromActions.loadStateSuccess({ loadedState })),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    storeState$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...[
                fromActions.addAsset,
                fromActions.buyAsset,
                fromActions.changeAssetOrder,
                fromActions.changeRadioButton,
                fromActions.changeRange,
                fromActions.toggleShowSoldCryptos,
                fromActions.chooseAsset,
                fromActions.deleteOffered,
                fromActions.findNewOfferSuccess,
                fromActions.sellAsset,
                fromActions.updateAssetsSuccess
            ]),
            withLatestFrom(this.store.pipe(select(fromSelectors.selectAppState))),
            tap(([action, appState]) => this.dataService.storeState(appState))
        ),
        { dispatch: false }
    );

    updateAssets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                fromActions.updateAssets,
                fromActions.findNewOfferSuccess
            ),
            withLatestFrom(this.store.pipe(select(fromSelectors.selectAssets))),
            switchMap(([action, assets]) => this.dataService.updateAssets(assets)
                .pipe(
                    map(updatedAssets => fromActions.updateAssetsSuccess({ updatedAssets })),
                    catchError((error) => {
                        this.store.dispatch(fromActions.errorNotification({ errorMessage: error }));
                        return EMPTY;
                    })
                )
            )
        )
    );

    findNewOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.findNewOffer),
            withLatestFrom(this.store.pipe(select(fromSelectors.selectAssets))),
            switchMap(([action, assets]) => this.dataService.findNewOffer(assets)
                .pipe(
                    map(offeredAssets => fromActions.findNewOfferSuccess({ offeredAssets })),
                    catchError((error) => {
                        this.store.dispatch(fromActions.errorNotification({ errorMessage: error }));
                        return EMPTY;
                    })
                )
            )
        )
    );

    buyAsset$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.buyAsset),
            withLatestFrom(this.store.pipe(select(fromSelectors.selectAssets))),
            switchMap(([action, assets]) => {
                const usd = assets.find(a => a.status === STATUS.usd);
                if (usd.amount_history[usd.amount_history.length - 1] === 0) {
                    //AlertAction feuern
                    return of(fromActions.alertNotEnoughOfAsset({ assetId: "USD" }));
                }
                else {
                    return EMPTY;
                }
            }
            )
        )
    );

    sellAsset$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.sellAsset),
            withLatestFrom(this.store.pipe(select(fromSelectors.selectAssets))),
            switchMap(([action, assets]) => {
                const soldAsset = assets.find(a => a.id === action.assetId);
                if (soldAsset.amount_history[soldAsset.amount_history.length - 1] === 0) {
                    //AlertAction feuern
                    return of(fromActions.alertNotEnoughOfAsset({ assetId: soldAsset.id }));
                }
                else {
                    return EMPTY;
                }
            }
            )
        )
    );

    alertNotEnoughOfAsset$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.alertNotEnoughOfAsset),
            switchMap(action => of(fromActions.alertNotEnoughOfAssetDone())
                .pipe(
                    delay(1000)
                )
            )
        )
    );




}