import { Component, OnInit } from '@angular/core';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
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

  loadDatas(filter: FilterActivationDTO) {
    this.isLoadingDatas = "ATIVO";
    this.apiService
      .getDataDetails(filter)
      .pipe(
        finalize(() => {
          this.isLoadingDatas = "INATIVO";
          this.dataSource.data = this.values;
          this.dataSource.paginator = this.paginator;
          this.changeTextLabelPaginator();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => (this.values = data));
  }
}
