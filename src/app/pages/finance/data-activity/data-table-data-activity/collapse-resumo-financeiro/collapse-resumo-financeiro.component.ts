import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse-resumo-financeiro',
  templateUrl: './collapse-resumo-financeiro.component.html',
  styleUrls: ['./collapse-resumo-financeiro.component.scss']
})
export class CollapseResumoFinanceiroComponent implements OnInit {

  @Input() sumPrice: number;
  @Input() activityTotal:number;
  @Input() mediaPrice:number;
  constructor() { }

  ngOnInit(): void {
  }

}
