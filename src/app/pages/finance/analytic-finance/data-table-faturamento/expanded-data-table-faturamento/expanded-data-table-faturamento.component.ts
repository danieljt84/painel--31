import { Component, Input, OnInit } from '@angular/core';
import { DataActivity } from 'src/app/model/finance/data-activity';

@Component({
  selector: 'app-expanded-data-table-faturamento',
  templateUrl: './expanded-data-table-faturamento.component.html',
  styleUrls: ['./expanded-data-table-faturamento.component.scss']
})
export class ExpandedDataTableFaturamentoComponent implements OnInit {
  @Input() datasActivity: any[];

  constructor() { }

  ngOnInit(): void {
  }


}
