import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { DataFileDetails } from 'src/app/model/detail/datafile-details';
import { Download } from 'src/app/model/download';
import { Filter } from 'src/app/model/filter';
import { ModalDownloadComponent } from 'src/app/pages/shared/modal-download/modal-download.component';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
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
export class DataTableComponent implements OnInit {
  values: DataFileDetails[] = [];
  isLoadingDatas = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = ['shop', 'promoter', 'project', 'date'];
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  pageEvent: PageEvent;
  download: Download;
  filter: Filter;
  initialDate: string;
  finalDate: string;
  idBrands: number[];

  constructor(
    private apiService: ApiPainelService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //Evento acioanado ao apertar o botão "filtrar"
    EventEmiterService.get('on-filter-data')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.initialDate = data.initialDate;
        this.finalDate = data.finalDate;
        this.idBrands = data.idBrands;
        this.filter = data.filter;
        this.loadDatas(
          data.initialDate,
          data.finalDate,
          data.idBrands,
          data.filter
        );
      });
  }

  loadDatas(
    initialDate: string,
    finalDate: string,
    idsBrands: number[],
    filter: Filter
  ) {
    this.isLoadingDatas = 'ATIVO';
    this.apiService
      .getDataDetails(initialDate, finalDate, idsBrands, filter)
      .pipe(
        finalize(() => {
          this.isLoadingDatas = 'INATIVO';
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

  //Função que troca a descrição da label do Paginator
  changeTextLabelPaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por pagina:';
  }

  changeMode() {}

  emitObservableToDownload() {
    this.download = {
      filename: 'details',
      observable: this.apiService.getDetailsToDownload(
        this.initialDate,
        this.finalDate,
        this.idBrands,
        this.filter
      ),
      type: 'xlsx',
    };
    const modal = this.modalService.open(ModalDownloadComponent);
    modal.componentInstance.download = this.download;
  }
}
