import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromActions from 'src/app/store/actions';

import { Asset } from '../../store/asset';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ASSET_ID } from 'src/app/store/global_constants';


@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.sass'],
  animations: [
    trigger('alert', [
      state('normal', style({ color: 'white' })),
      state('alert', style({ color: '#d15774' })),
      transition('* => *', animate('0.2s')),
    ])
  ]
})

export class CryptoComponent {

  @Input() asset: Asset;
  @Input() range: number;
  @Input() isChosen: boolean;
  @Input() isAlert: boolean;

  ASSET_ID = ASSET_ID;

  constructor(private store: Store) { }



  chooseAsset() {
    this.store.dispatch(fromActions.chooseAsset({ assetID: this.asset.id }));
  }

  buyAsset(): void {
    this.store.dispatch(fromActions.buyAsset({ assetID: this.asset.id }));
  }

  sellAsset(): void {
    this.store.dispatch(fromActions.sellAsset({ assetId: this.asset.id }));
  }

}
