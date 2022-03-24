import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, timer } from 'rxjs';
import { Asset } from 'src/app/store/asset';
import { COLORS, QUEST_REWARD, QUEST_STATUS, QUEST_TYPE } from 'src/app/store/global_constants';
import { Quest } from 'src/app/store/quest';
import * as fromActions from 'src/app/store/actions';
import { Color, Label } from 'ng2-charts';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';


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

  chartOptions: ChartOptions;
  chartLabels: Label[];
  chartType: ChartType = 'bar';
  chartLegend = false;
  chartPlugins = [];
  chartData: ChartDataSets[];
  chartColors: Color[];

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

    Chart.defaults.global.defaultFontColor = COLORS.white;

    this.chartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function(value, index, ticks) {
              return Chart.Ticks.formatters.numeric.apply(this, [value, index, ticks])+"%";
            }
          }
        }]
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
    this.chartData = [
      {
        data: [this.quest.score, this.quest.target]
      }
    ];

    this.chartLabels = ['you', 'target'];

    if (this.quest.score > this.quest.target) {
      this.chartColors = [
        {
          backgroundColor: [COLORS.green, COLORS.red],
          hoverBackgroundColor: [COLORS.greenLight, COLORS.redLight],
          borderWidth: 0
        }
      ];
    }
    else {
      this.chartColors = [
        {
          backgroundColor: [COLORS.red, COLORS.green],
          hoverBackgroundColor: [COLORS.redLight, COLORS.greenLight],
          borderWidth: 0
        }
      ];
    }
  }
}

