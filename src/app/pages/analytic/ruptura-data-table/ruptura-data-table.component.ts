import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { format, subDays } from 'date-fns';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ruptura-data-table',
  templateUrl: './ruptura-data-table.component.html',
  styleUrls: ['./ruptura-data-table.component.scss']
})
export class RupturaDataTableComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['Loja', 'Produto', 'Data'];
  dataSource = new MatTableDataSource<any>();
  today:string;
  yesterday:string;
  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10];
  @ViewChild (MatPaginator, { static: false }) paginator: MatPaginator;
  pageEvent: PageEvent;

  constructor(private userService:UserService, private apiPainelService:ApiPainelService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.today = format(new Date(),'yyyy-MM-dd');
    this.yesterday = format(subDays(new Date(),1),'yyyy-MM-dd');
    this.loadDatas();
  }

  loadDatas(){
    this.apiPainelService
    .getRupturaBetweenDateByBrand(this.userService.obterUsuarioLogado.brand.id,this.yesterday,this.today)
    .subscribe(data => this.dataSource.data = data );
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

}
