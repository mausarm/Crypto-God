import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Asset } from 'src/app/store/asset';
import { Store } from '@ngrx/store';

import * as fromActions from 'src/app/store/actions';

import { STATUS } from 'src/app/store/global_constants';
import { interval, Subscription, timer } from 'rxjs';


@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.sass'],
})
export class ChoiceComponent implements OnInit, OnDestroy {

  @Input() offeredAssets: Asset[];
  @Input() lastNewAsset: Asset;
  @Input() nextNewAssetDate: Date;

  private subscription: Subscription;

  public dateNow = new Date();

  public timeDifference;
  public seconds;
  public minutes;
  public hours;
  public days;

  constructor(private store: Store) { }

  private getTimeDifference() {
    this.timeDifference = this.nextNewAssetDate.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.seconds = Math.floor((timeDifference) / (1000) % 60);
    this.minutes = Math.floor((timeDifference) / (1000 * 60) % 60);
    this.hours = Math.floor((timeDifference) / (1000 * 60 * 60) % 24);
    this.days = Math.floor((timeDifference) / (1000 * 60 * 60 * 24));
  }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  public choose(chosenAsset: Asset) {
    const newAsset = chosenAsset.clone();
    newAsset.status = STATUS.owned;
    newAsset.amount_history = [1000 / newAsset.price];
    newAsset.amount_timestamps = [new Date()];
    this.store.dispatch(fromActions.addAsset({ newAsset }));
    this.store.dispatch(fromActions.deleteOffered());
  }

}
