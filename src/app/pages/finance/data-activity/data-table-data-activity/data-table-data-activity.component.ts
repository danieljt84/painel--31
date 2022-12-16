import { Component, OnInit } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { DataActivity } from 'src/app/model/finance/data-activity';
import { FilterDataTableDataActivity } from 'src/app/model/finance/FilterDataTableDataActivity';
import { DataActivityService } from 'src/app/services/data-activity.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';

@Component({
  selector: 'app-data-table-data-activity',
  templateUrl: './data-table-data-activity.component.html',
  styleUrls: ['./data-table-data-activity.component.scss']
})
export class DataTableDataActivityComponent implements OnInit {

  datasActivity: DataActivity[];
  listToDisplay: DataActivity[];
  isLoadingDatas = "" ;
  destroy$: Subject<boolean> = new Subject<boolean>();
  filter: FilterDataTableDataActivity


  constructor(private dataActivityService: DataActivityService) { }

  ngOnInit(): void {
    EventEmiterService.get('on-filter-data')
      .pipe(takeUntil(this.destroy$))
      .subscribe(filter => {
        this.filter = filter;
        this.loadDatas();
      });
  }

  loadDatas() {
    this.isLoadingDatas = "ATIVO";
    this.dataActivityService
      .findByFilter(this.filter)
      .pipe(
        finalize(() => {
          this.isLoadingDatas = "INATIVO";
          this.listToDisplay = [...this.datasActivity]
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => (this.datasActivity = data));
  }
}
