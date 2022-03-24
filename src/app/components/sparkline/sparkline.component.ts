import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { COLORS } from 'src/app/store/global_constants';

import { Asset } from '../../store/asset';

@Component({
  selector: 'app-sparkline',
  templateUrl: './sparkline.component.html',
  styleUrls: ['./sparkline.component.sass']
})
export class SparklineComponent implements OnInit, OnChanges {

  @Input() asset: Asset;
  @Input() range: number;

  chartType: ChartType = 'line';
  chartData: ChartDataset[];
  chartLabels: any[];
  chartOptions: ChartOptions;


  constructor() {

  }

  ngOnInit(): void {

    this.chartOptions = {
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    };

    this.updateChart();
  }


  ngOnChanges(): any {
    this.updateChart();
  }


  private updateChart() {
    this.chartData = [{
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: false,
      data: this.asset.history[this.range].prices.slice(),
      borderColor: COLORS.redLight,
      borderWidth: 2
    }];

    this.chartLabels = this.asset.history[this.range].timestamps.map(x => "");
  }
}
