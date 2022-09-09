import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-ativacao-card',
  templateUrl: './ativacao-card.component.html',
  styleUrls: ['./ativacao-card.component.scss']
})
export class AtivacaoCardComponent implements OnInit {
  public doughnutChartLabels: string[] = [ 'Realizado', 'Pendente'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [ 350, 450 ],backgroundColor:['rgb(254, 93, 112)','rgb(10, 194, 130)'] },
  ];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout:50,
    plugins:{
      legend:{
        display:false
      }
    }
    
  };

  constructor() { }

  ngOnInit(): void {
  }

}
