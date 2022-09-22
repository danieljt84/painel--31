import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { format, subDays } from 'date-fns';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alerta-validade',
  templateUrl: './alerta-validade.component.html',
  styleUrls: ['./alerta-validade.component.scss']
})
export class AlertaValidadeComponent implements OnInit {
  displayedColumns: string[] = ['nameShop', 'nameProduct', 'validity', 'stock'];
  dataSource = new MatTableDataSource<any>();
  today:string;
  yesterday:string;
  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5,10];
  @ViewChild (MatPaginator, { static: false }) paginator: MatPaginator;
  pageEvent: PageEvent;
  @ViewChild(MatSort) sort: MatSort;
  sortedData: any[];

  
  constructor(private apiPainelService:ApiPainelService, private userService:UserService) { }

  ngOnInit(): void {
    this.today = format(new Date(),'yyyy-MM-dd');
    this.yesterday = format(subDays(new Date(),30),'yyyy-MM-dd');
    this.loadDatas();
  }

  loadDatas(){
     this.apiPainelService.getValidityBetweenDateByBrand(this.userService.obterUsuarioLogado.brand.id,this.yesterday,this.today)
     .subscribe(data =>{
       this.dataSource.data = data;
     });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
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
