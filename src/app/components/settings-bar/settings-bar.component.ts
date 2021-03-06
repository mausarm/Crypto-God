import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromActions from 'src/app/store/actions';

import { QUEST_STATUS, RADIOCHECKED } from 'src/app/store/global_constants';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Subscription, timer } from 'rxjs';
import { Quest } from 'src/app/store/quest';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.sass'],
  animations: [
    trigger('highlight', [
      state('normal', style({ backgroundColor: '#009688' })),
      state('highlighted', style({ backgroundColor: '#00BFA5' })),
      transition('* => *', animate('0.2s')),
    ])
  ]

})
export class SettingsBarComponent implements OnInit, OnDestroy {

  @Input() radioChecked: string;
  @Input() newOfferAvailable: boolean;
  @Input() quest: Quest;

  RADIOCHECKED = RADIOCHECKED; //muss anscheinend sein, um enum in template zu benutzen
  private subscription: Subscription;
  private tick = false; //für flashing Buttons


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscription = timer(0, 1000).subscribe(n => {
      this.tick = !this.tick;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public range(range: string): void {
    this.store.dispatch(fromActions.changeRadioButton({ value: range }));
    this.store.dispatch(fromActions.changeRange({ range: Number(range) }));
  }

  public offerButton(): void {
    this.store.dispatch(fromActions.changeRadioButton({ value: RADIOCHECKED.offer }));
  }

  public questButton(): void {
    this.store.dispatch(fromActions.changeRadioButton({ value: RADIOCHECKED.quest }));
  }

  public getOfferButtonState(): string {
    if (this.radioChecked === RADIOCHECKED.offer) {
      return "highlighted";
    }
    else if (this.newOfferAvailable && this.tick) {
      return "highlighted";
    }
    else {
      return "normal";
    }
  }

  public getQuestButtonState(): string {
    if (this.radioChecked === RADIOCHECKED.quest) {
      return "highlighted";
    }
    else if (this.quest.status!== QUEST_STATUS.active && !this.tick) {
      return "highlighted";
    }
    else {
      return "normal";
    }
  }
}
