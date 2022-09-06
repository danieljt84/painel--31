import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { DataFileDetails } from 'src/app/model/detail/datafile-details';
import { Filter } from 'src/app/model/filter';
import { ApiService } from 'src/app/services/api.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  values: DataFileDetails[] = [];
  isLoadingDatas = "" ;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = ['shop', 'promoter', 'project','date'];
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  destroy$: Subject<boolean> = new Subject<boolean>();
  pageEvent: PageEvent;

  constructor(private apiService: ApiService) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    EventEmiterService.get('on-filter-data')
      .pipe(takeUntil(this.destroy$))
      .subscribe((filter) => {
        this.loadDatas(filter as Filter);
      });
  }

  loadDatas(filter: Filter) {
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

  toggleRow(element: { expanded: boolean }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded;
  }



  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  changeTextLabelPaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por pagina:';
  }

  changeMode() {}
}
