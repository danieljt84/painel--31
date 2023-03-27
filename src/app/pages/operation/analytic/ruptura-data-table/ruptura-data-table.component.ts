import { formatDate } from '@angular/common';
import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { format, subDays } from 'date-fns';
import { finalize } from 'rxjs';
import { Config } from 'src/app/model/config';
import { Download } from 'src/app/model/download';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { ConfigService } from 'src/app/services/config.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ruptura-data-table',
  templateUrl: './ruptura-data-table.component.html',
  styleUrls: ['./ruptura-data-table.component.scss']
})
export class RupturaDataTableComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['Loja', 'Produto', 'Data'];
  dataSource = new MatTableDataSource<any>();
  initialDate:string;
  finalDate:string;
  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  @ViewChild (MatPaginator, { static: false }) paginator: MatPaginator;
  pageEvent: PageEvent;
  isLoading = true;
  download: Download;
  config: Config;


  constructor(private configService:ConfigService
    , private apiPainelService:ApiPainelService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.finalDate = format(new Date(),'yyyy-MM-dd');
    this.initialDate = format(subDays(new Date(),7),'yyyy-MM-dd');
this.getConfig();
    this.eventListenerChangeDate();
  }

  loadDatas(){
    this.isLoading = true;
    this.apiPainelService
    .getRupturaBetweenDateByBrand( formatDate(this.initialDate, 'yyyy-MM-dd','en'),
    formatDate(this.finalDate, 'yyyy-MM-dd','en'),this.config.brands.map(element => element.id),this.config.projects?this.config.projects.map(ele => ele.id) : null)
    .pipe(finalize(() => this.isLoading = false)).subscribe(data => this.dataSource.data = data );
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

  eventListenerChangeDate(){
    EventEmiterService.get('change-date-analytic')
    .subscribe(data=>{
      this.initialDate = data.initialDate;
      this.finalDate = data.finalDate;
      this.loadDatas()
    })
  }

   getConfig() {
    this.configService.getConfig().subscribe(config =>{
      this.config = config;
      this.loadDatas();
    })
  }

  emitObservableToDownload(event:any){
    if(event == 'exportar'){
      this.download = {
        filename :"ruptura",
        observable: this.apiPainelService .getRupturaToDownload( formatDate(this.initialDate, 'yyyy-MM-dd','en'),
        formatDate(this.finalDate, 'yyyy-MM-dd','en'),this.config.brands.map(element => element.id),this.config.projects?this.config.projects.map(ele => ele.id) : null),
        type:"xlsx"
      }
    }
  }
}
