import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, Subject, takeUntil } from 'rxjs';
import { DataActivity } from 'src/app/model/finance/data-activity';
import { FilterDataTableDataActivity } from 'src/app/model/finance/FilterDataTableDataActivity';
import { DataActivityService } from 'src/app/services/data-activity.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { ModalDataTableDataActivityComponent } from './modal-data-table-data-activity/modal-data-table-data-activity.component';

@Component({
  selector: 'app-data-table-data-activity',
  templateUrl: './data-table-data-activity.component.html',
  styleUrls: ['./data-table-data-activity.component.scss'],
})
export class DataTableDataActivityComponent implements OnInit {
  datasActivity: DataActivity[];
  listToDisplay: DataActivity[];
  isLoadingDatas = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  filter: FilterDataTableDataActivity;
  sumPrice: number;
  activityTotal: number;
  mediaPrice:number;
  isToShowCollapse = false;
  constructor(private dataActivityService: DataActivityService, private modalService: NgbModal) {}

  ngOnInit(): void {
    EventEmiterService.get('on-filter-data')
      .pipe(takeUntil(this.destroy$))
      .subscribe((filter) => {
        this.filter = filter;
        this.loadDatas();
      });
  }

  loadDatas() {
    this.isLoadingDatas = 'ATIVO';
    this.dataActivityService
      .findByFilter(this.filter)
      .pipe(
        finalize(() => {
          this.isToShowCollapse = true;
          this.isLoadingDatas = 'INATIVO';
          this.listToDisplay = [...this.datasActivity];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.datasActivity = data;
        this.sumPrice = this.datasActivity
          .map((data) => data.price)
          .reduce((previus, current) => previus + current);
        this.activityTotal = Array.from(new Set (this.datasActivity.map(data => data.activity.description))).length;        this.mediaPrice = this.sumPrice/this.activityTotal;
      });
  }

  showModal(dataActivity: DataActivity){
    const modal = this.modalService.open(ModalDataTableDataActivityComponent);
    modal.componentInstance.dataActivity = dataActivity;
  }
}
