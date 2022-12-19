import { Component, Input, OnInit } from '@angular/core';
import { DataActivity } from 'src/app/model/finance/data-activity';

@Component({
  selector: 'app-expanded-data-table-bonus',
  templateUrl: './expanded-data-table-bonus.component.html',
  styleUrls: ['./expanded-data-table-bonus.component.scss']
})
export class ExpandedDataTableBonusComponent implements OnInit {
  @Input() datasActivity: DataActivity[];
  constructor() { }

  ngOnInit(): void {
  }

}
