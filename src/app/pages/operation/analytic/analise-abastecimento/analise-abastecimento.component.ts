import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Config } from 'src/app/model/config';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { ConfigService } from 'src/app/services/config.service';

interface DataTable {
  loja: string;
  produto: string;
  primeiro: number;
  segundo: number;
  terceiro: number;
  quarto: number;
  mediaAbastecimento: number;
  totalAbastecimento: number;
}
const datas = [
  {
    loja: 'LOJA1',
    produto: 'PRODUTO1',
    primeiro: 100,
    segundo: 100,
    terceiro: 100,
    quarto: 100,
    mediaAbastecimento: 100,
    totalAbastecimento: 100,
  },
  {
    loja: 'LOJA1',
    produto: 'PRODUTO1',
    primeiro: 100,
    segundo: 100,
    terceiro: 100,
    quarto: 100,
    mediaAbastecimento: 100,
    totalAbastecimento: 100,
  },
  {
    loja: 'LOJA1',
    produto: 'PRODUTO1',
    primeiro: 100,
    segundo: 100,
    terceiro: 100,
    quarto: 100,
    mediaAbastecimento: 100,
    totalAbastecimento: 100,
  },
  {
    loja: 'LOJA1',
    produto: 'PRODUTO1',
    primeiro: 100,
    segundo: 100,
    terceiro: 100,
    quarto: 100,
    mediaAbastecimento: 100,
    totalAbastecimento: 100,
  },
];
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
  datas: DataTable[];
  constructor(
    private apiPainelService: ApiPainelService,
    private configService: ConfigService
  ) {
    this.dataSource.data = datas;
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
       console.log(data.supplyList)
      });
  }
}
