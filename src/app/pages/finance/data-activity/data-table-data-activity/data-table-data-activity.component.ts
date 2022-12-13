import { Component, OnInit } from '@angular/core';
import { DataActivity } from 'src/app/model/finance/data-activity';
import { DataActivityService } from 'src/app/services/data-activity.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';

@Component({
  selector: 'app-data-table-data-activity',
  templateUrl: './data-table-data-activity.component.html',
  styleUrls: ['./data-table-data-activity.component.scss']
})
export class DataTableDataActivityComponent implements OnInit {

  datasActivity: DataActivity[];
  listToDisplay: DataActivity[]

  constructor(private dataActivityService: DataActivityService) { }

  ngOnInit(): void {
    this.loadDataActivity();
  }

  loadDataActivity() {
    this.dataActivityService.list().subscribe((data) => {
      this.datasActivity = data;
      this.listToDisplay = [...this.datasActivity];
    });
  }
}
