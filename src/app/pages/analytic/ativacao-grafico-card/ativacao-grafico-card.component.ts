import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ativacao-grafico-card',
  templateUrl: './ativacao-grafico-card.component.html',
  styleUrls: ['./ativacao-grafico-card.component.scss']
})
export class AtivacaoGraficoCardComponent implements OnInit {
  public labels: string[] = [ 'Realizado', 'Pendente'];
  public datasets= [
    { data: [ 350, 450 ]},
  ];
  public options = {
    responsive: true,
    maintainAspectRatio: true,
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
