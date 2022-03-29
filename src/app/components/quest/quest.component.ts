import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, timer } from 'rxjs';
import { Asset } from 'src/app/store/asset';
import { COLORS, QUEST_DURATION, QUEST_REWARD, QUEST_STATUS, QUEST_TYPE } from 'src/app/store/global_constants';
import { Quest } from 'src/app/store/quest';
import * as fromActions from 'src/app/store/actions';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { questReducer } from 'src/app/store/reducer';


@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.sass']
})
export class QuestComponent implements OnInit, OnDestroy, OnChanges {

  @Input() quest: Quest;
  @Input() assets: Asset[];

  QUEST_STATUS = QUEST_STATUS;
  QUEST_TYPE = QUEST_TYPE;
  QUEST_REWARD = QUEST_REWARD;
  QUEST_DURATION = QUEST_DURATION;

  chartOptions: ChartOptions;
  chartLabels: any[];
  chartType: ChartType = 'bar';
  chartLegend = false;
  chartPlugins = [];
  chartData: ChartDataset[];

  private subscription: Subscription;
  public dateNow = new Date();
  public timeDifference = 0;
  public seconds = 0;
  public minutes = 0;
  public hours = 0;

  constructor(private store: Store) { }

  private getTimeDifference() {
    if (this.quest.status === QUEST_STATUS.active) {
      this.timeDifference = this.quest.endTime.getTime() - new Date().getTime();
      if (this.timeDifference <= 0) {
        this.store.dispatch(fromActions.updateQuest({ assets: this.assets }));
        this.timeDifference = 0;
      }
      this.allocateTimeUnits(this.timeDifference);
    }

  }

  private allocateTimeUnits(timeDifference) {
    this.seconds = Math.floor((timeDifference) / (1000) % 60);
    this.minutes = Math.floor((timeDifference) / (1000 * 60) % 60);
    this.hours = Math.floor((timeDifference) / (1000 * 60 * 60));
  }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .subscribe(x => { this.getTimeDifference(); });

    Chart.defaults.color = COLORS.white;

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (val, index) {
              return this.getLabelForValue(Number(val)) + "%";
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    };
    this.updateChart();

  }

  ngOnChanges(): any {
    this.updateChart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  startQuest() {
    this.store.dispatch(fromActions.startQuest({ startAssets: this.assets }));
  }

  newQuest() {
    this.store.dispatch(fromActions.newQuest({ lastQuest: this.quest }));
  }

  getReward() {
    this.store.dispatch(fromActions.getReward());
    this.store.dispatch(fromActions.newQuest({ lastQuest: this.quest }));
  }

  private updateChart() {

    switch (this.quest.type) {
      case QUEST_TYPE.gainTotal:
        this.chartLabels = ['you', 'target'];
        break;
      case QUEST_TYPE.beatBitcoin:
        this.chartLabels = ['you', 'Bitcoin'];
        break;
      case QUEST_TYPE.beatAverage:
        this.chartLabels = ['you', 'average'];
        break;
      case QUEST_TYPE.beatHodler:
        this.chartLabels = ['you', 'hodler'];
        break;
    }

    if (this.quest.score > this.quest.target) {
      this.chartData = [
        {
          data: [this.quest.score, this.quest.target],
          backgroundColor: [COLORS.green, COLORS.red],
          hoverBackgroundColor: [COLORS.greenLight, COLORS.redLight],
          borderWidth: 0
        }
      ];
    }
    else {
      this.chartData = [
        {
          data: [this.quest.score, this.quest.target],
          backgroundColor: [COLORS.red, COLORS.green],
          hoverBackgroundColor: [COLORS.redLight, COLORS.greenLight],
          borderWidth: 0
        }
      ];
    }
  }
}

