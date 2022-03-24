import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { formatDate } from '@angular/common';
import { Color, Label } from 'ng2-charts';

import { Asset } from '../../store/asset';
import { COLORS } from 'src/app/store/global_constants';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() asset: Asset;
  @Input() range: number;

  chartData: ChartDataSets[];
  chartLabels: Label[];
  chartOptions: ChartOptions;
  chartColors: Color[];


  constructor() {

  }

  ngOnInit(): void {

    Chart.defaults.global.defaultFontColor = COLORS.white;

    this.chartOptions = {
      layout: {
        padding: {
            bottom: 10
        }
      },
      tooltips: {displayColors: false},
      responsive: true,
      elements: {
        point: {
          radius: 0,
          hitRadius: 20
        }
      },
      animation: {
        duration: 0,
      },
      legend: {
        labels: {
          fontSize: 16,
          boxWidth: 0

        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 10
          },
          gridLines: {
            color: 'rgba(100,100,100,1)'
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 10
          },
          gridLines: {
            color: 'rgba(100,100,100,1)'
          }
        }],
      }
    };

    this.chartColors = [
      {
        borderColor: COLORS.redLight,
        pointHoverBorderColor: COLORS.redLight,
        pointHoverBackgroundColor: COLORS.white,
      },
    ];

    this.update();

  }
  ngOnChanges(): any {
    this.update();
  }

  private update(): any {
    this.chartData = [{
      label: this.asset.name,
      pointRadius: 0,
      fill: false,
      data: this.asset.history[this.range].prices.slice()
    }];
    const duration = new Date().getTime() - this.asset.history[this.range].timestamps[0].getTime();
    if (duration < 25*3600000) {
      this.chartLabels = this.asset.history[this.range].timestamps.map(d => formatDate(d, 'HH:mm', 'en-US'));
    }
    else if (duration < 8*24*3600000) {
      this.chartLabels = this.asset.history[this.range].timestamps.map(d => formatDate(d, 'MM-dd HH', 'en-US')+"h");
    }
    else {
      this.chartLabels = this.asset.history[this.range].timestamps.map(d => formatDate(d, 'YYYY-MM-dd', 'en-US'));
    }

  }

}
