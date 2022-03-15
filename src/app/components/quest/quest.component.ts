import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, timer } from 'rxjs';
import { Asset } from 'src/app/store/asset';
import { Quest } from 'src/app/store/quest';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.sass']
})
export class QuestComponent implements OnInit, OnDestroy {

  @Input() quest: Quest;
  @Input() assets: Asset[];

  private subscription: Subscription;

  public dateNow = new Date();

  public timeDifference;
  public seconds;
  public minutes;
  public hours;
  public days;

  constructor(private store: Store) { }

  private getTimeDifference() {
    this.timeDifference = this.quest.endTime.getTime() - new Date().getTime();
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

}
