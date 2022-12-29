import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-bar-faturamento',
  templateUrl: './chart-bar-faturamento.component.html',
  styleUrls: ['./chart-bar-faturamento.component.scss']
})
export class ChartBarFaturamentoComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins: any = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
    datasets: [
      {
        data: [ 650000, 590000, 80000, 810000, 560000, 55, 40, 56, 55, 40, 10,10 ], label: 'Series A',
        backgroundColor: "Green"
      },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor() { }

  ngOnInit(): void {
  }

}
