import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store, select } from '@ngrx/store';

import * as fromSelectors from 'src/app/store/selectors';
import * as fromActions from 'src/app/store/actions';
import { RADIOCHECKED } from 'src/app/store/global_constants';
import { Subscription, timer } from 'rxjs';
import { Asset } from 'src/app/store/asset';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit, OnDestroy {

  assets$ = this.store.pipe(select(fromSelectors.selectAssets));
  shownAssets$ = this.store.pipe(select(fromSelectors.selectShownAssets));
  offeredAssets$ = this.store.pipe(select(fromSelectors.selectOfferedAssets));
  unofferedAssets$ = this.store.pipe(select(fromSelectors.selectUnofferedAssets));
  soldAssets$ = this.store.pipe(select(fromSelectors.selectSoldAssets));
  range$ = this.store.pipe(select(fromSelectors.selectRange));
  chosenAsset$ = this.store.pipe(select(fromSelectors.selectChosenAsset));
  radioChecked$ = this.store.pipe(select(fromSelectors.selectRadioChecked));
  isLoading$ = this.store.pipe(select(fromSelectors.selectIsLoading));
  showSoldCryptos$ = this.store.pipe(select(fromSelectors.selectShowSoldCryptos));
  lastNewAsset$ = this.store.pipe(select(fromSelectors.selectLastNewAsset));
  nextNewAssetDate$ = this.store.pipe(select(fromSelectors.selectNextNewAssetDate));
  alertAssetId$ = this.store.pipe(select(fromSelectors.selectAlertAssetId));
  errorMessage$ = this.store.pipe(select(fromSelectors.selectErrorMessage));
  quest$ = this.store.pipe(select(fromSelectors.selectQuest));



  RADIOCHECKED = RADIOCHECKED; //anscheinend nötig für enum im template

  private subscription: Subscription;
  private timeout;
  private shownAssets: ReadonlyArray<Asset>;

  constructor(private store: Store) {

  }

  ngOnInit(): void {

    this.store.dispatch(fromActions.loadState());

    this.subscription = timer(0, 60000).subscribe(n =>
      this.store.dispatch(fromActions.updateAssets())
    )


    this.nextNewAssetDate$.subscribe(nextNewAssetDate => {
      const delay = Math.max(nextNewAssetDate.getTime() - (new Date()).getTime() , 0);
      this.timeout = setTimeout(
        () => {
          this.store.dispatch(fromActions.deleteOffered());
          this.store.dispatch(fromActions.findNewOffer());
        },
        delay
      );
    });

    this.shownAssets$.subscribe((shownAssets) => this.shownAssets = shownAssets);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearTimeout(this.timeout);
  }


  switchToOffer() {
    this.store.dispatch(fromActions.changeRadioButton({ value: RADIOCHECKED.offer }));
  }

  drop(event: CdkDragDrop<string[]>) {
    this.store.dispatch(fromActions.changeAssetOrder({ moveAssetId: this.shownAssets[event.previousIndex].id, inPlaceOfAssetId: this.shownAssets[event.currentIndex].id }));
  }

  toggleSold() {
    this.store.dispatch(fromActions.toggleShowSoldCryptos());
  }

}
