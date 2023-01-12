import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table-faturamento',
  templateUrl: './data-table-faturamento.component.html',
  styleUrls: ['./data-table-faturamento.component.scss'],
})
export class DataTableFaturamentoComponent implements OnInit {
  expandSet = new Set<string>();
  listToDisplay = [
    {
      brand: {
        name: 'teste',
      },
      sumPDV: '10',
      sumBilling: 10,
      sumBonus: 10,
      sumDiscount: 10,
      averageTicket: 100,
    },
    {
      brand: {
        name: 'teste2',
      },
      sumPDV: '10',
      sumBilling: 10,
      sumBonus: 10,
      sumDiscount: 10,
      averageTicket: 100,
    },
    {
      brand: {
        name: 'teste2',
      },
      sumPDV: '10',
      sumBilling: 10,
      sumBonus: 10,
      sumDiscount: 10,
      averageTicket: 100,
    },
  ];

  expandedListToDisplay=[
    {
      id:1,
      activity:{
        description:"teste",
      },
      shop:{
        name:"teste"
      },
      price:10
    },
    {
      id:2,
      activity:{
        description:"teste",
      },
      shop:{
        name:"teste"
      },
      price:10
    },
    {
      id:3,
      activity:{
        description:"teste",
      },
      shop:{
        name:"teste"
      },
      price:10
    },
  ]
  constructor() {}

  ngOnInit(): void {}

  onExpandChange(brandName: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(brandName);
    } else {
      this.expandSet.delete(brandName);
    }
  }
}
