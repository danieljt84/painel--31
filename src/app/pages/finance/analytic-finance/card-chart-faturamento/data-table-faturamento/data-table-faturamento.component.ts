import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table-faturamento',
  templateUrl: './data-table-faturamento.component.html',
  styleUrls: ['./data-table-faturamento.component.scss']
})
export class DataTableFaturamentoComponent implements OnInit {
  dataSet = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
