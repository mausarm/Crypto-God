import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { Asset } from '../../store/asset';

@Component({
  selector: 'app-sparkline',
  templateUrl: './sparkline.component.html',
  styleUrls: ['./sparkline.component.sass']
})
export class SparklineComponent implements OnInit, OnChanges {

  @Input() asset: Asset;
  @Input() range: number;

  chartData: ChartDataSets[];
  chartLabels: Label[];
  chartOptions: ChartOptions;
  chartColors: Color[];


  constructor() {

  }

  ngOnInit(): void {

    Chart.defaults.global.defaultFontColor = '#fff';

    this.chartData = [{
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: false,
      data: this.asset.history[this.range].prices.slice()
    }];

    this.chartLabels = this.asset.history[this.range].timestamps.map(x => "");

    this.chartOptions = {
      tooltips: { enabled: false },
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          display: false
        }],
        xAxes: [{
          display: false
        }]
      }
    };

    this.chartColors = [
      {
        borderColor: '#d15774',
        borderWidth: 2
      },
    ];




  }
  ngOnChanges(): any {
    this.chartData = [{
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: false,
      data: this.asset.history[this.range].prices.slice()
    }];

    this.chartLabels = this.asset.history[this.range].timestamps.map(x => "");
  }


}
