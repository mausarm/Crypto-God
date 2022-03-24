import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { formatDate } from '@angular/common';

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

  chartType: ChartType = 'line';
  chartData: ChartDataset[];
  chartLabels: any[];
  chartOptions: ChartOptions;


  constructor() {

  }

  ngOnInit(): void {

    Chart.defaults.color = COLORS.white;

    this.chartOptions = {
      layout: {
        padding: { bottom: 10 }
      },
      plugins: {
        tooltip: { displayColors: false },
        legend: {
          labels: {
            font: {size: 16},
            boxWidth: 0

          }
        },
      },
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

      scales: {
        y: {
          ticks: {
            font: { size: 10 }
          },
          grid: {
            color: 'rgba(100,100,100,1)'
          }
        },
        x: {
          ticks: {
            font: { size: 10 }
          },
          grid: {
            color: 'rgba(100,100,100,1)'
          }
        },
      }
    };

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
      data: this.asset.history[this.range].prices.slice(),
      borderColor: COLORS.redLight,
      pointHoverBorderColor: COLORS.redLight,
      pointHoverBackgroundColor: COLORS.white,
    }];
    const duration = new Date().getTime() - this.asset.history[this.range].timestamps[0].getTime();
    if (duration < 25 * 3600000) {
      this.chartLabels = this.asset.history[this.range].timestamps.map(d => formatDate(d, 'HH:mm', 'en-US'));
    }
    else if (duration < 8 * 24 * 3600000) {
      this.chartLabels = this.asset.history[this.range].timestamps.map(d => formatDate(d, 'MM-dd HH', 'en-US') + "h");
    }
    else {
      this.chartLabels = this.asset.history[this.range].timestamps.map(d => formatDate(d, 'YYYY-MM-dd', 'en-US'));
    }

  }

}
