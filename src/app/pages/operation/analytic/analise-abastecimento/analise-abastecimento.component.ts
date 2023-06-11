import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SupplyDataTable } from 'src/app/model/analytic/supply-datatable';
import { Config } from 'src/app/model/config';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { ConfigService } from 'src/app/services/config.service';



@Component({
  selector: 'app-analise-abastecimento',
  templateUrl: './analise-abastecimento.component.html',
  styleUrls: ['./analise-abastecimento.component.scss'],
})
export class AnaliseAbastecimentoComponent implements OnInit {
  displayedColumns: string[] = [
    'Loja',
    'Produto',
    '1',
    '2',
    '3',
    '4',
    'mediaAbastecimento',
    'totalAbastecimento',
  ];
  dataSource = new MatTableDataSource<any>();
  config: Config;
  datas: SupplyDataTable[] = [];
  constructor(
    private apiPainelService: ApiPainelService,
    private configService: ConfigService
  ) {
    //this.dataSource.data =  ;
  }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {
    this.configService.getConfig().subscribe((config) => {
      this.config = config;
      this.loadDatas();
    });
  }

  loadDatas() {
    this.apiPainelService
      .getAverageSupply(
        formatDate(this.config.initialDate, 'yyyy-MM-dd', 'en'),
        formatDate(this.config.finalDate, 'yyyy-MM-dd', 'en'),
        this.config.brands.map((element) => element.id),
        this.config.projects ? this.config.projects.map((ele) => ele.id) : null
      )
      .subscribe((data) => {
       console.log(new Date());
       let shops = Array.from(new Set(data.supplyList.map(element => element.shop)));
       let products =  Array.from(new Set(data.supplyList.map(element => element.product)));
       let projects =  Array.from(new Set(data.supplyList.map(element => element.project)));
       

       shops.forEach(shop =>{
        projects.forEach(project => {
          products.forEach(product =>{
             let filter = data.supplyList.filter(supply => supply.project== project && supply.product == product && supply.shop == shop);
             if(filter.length!=0){ 
              let supply: SupplyDataTable ={
                shop:shop,product:product,averageSupply:null,totalSupply:null,values:[]
              }

              filter = filter.sort((a,b) => a.seq - b.seq);
              filter.forEach(element => supply.values.push(element.stock));
              let sum =+ supply.values.reduce((x,y) => x +y);
              supply.totalSupply = sum;
              supply.averageSupply = sum/supply.values.length;
              this.datas.push({...supply})
             }
          })
        })
       })
       console.log(this.datas);
       console.log(new Date());
      });
  }
}
