import { Chain } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { format, isThisSecond, subDays } from 'date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { filter, finalize, forkJoin, Observable } from 'rxjs';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { Brand } from 'src/app/model/brand';
import { Download } from 'src/app/model/download';
import { Filter } from 'src/app/model/filter';
import { Project } from 'src/app/model/project';
import { Shop } from 'src/app/model/shop';
import { ApiOperationService } from 'src/app/services/api/api-operation.service';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { ConfigService } from 'src/app/services/config.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ativacao-card',
  templateUrl: './ativacao-card.component.html',
  styleUrls: ['./ativacao-card.component.scss'],
})
export class AtivacaoCardComponent implements OnInit {
  realizado: number;
  pendente: number;
  percentual: string;
  private finalDate: Date;
  private initialDate: Date;
  private brands: Brand[];
  private projects: Project[]
  filter: Filter;
  valuesToFilter: FilterActivationDTO;
  itensSelecteds = new Map<string, Object[]>();
  isLoadingValues = true;
  download: Download;
  showButtonFilter = false;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public doughnutChartLabels: string[] = ['Realizado', 'Pendente'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      {
        data: [350, 450],
        backgroundColor: ['rgb(10, 194, 130)', 'rgb(254, 93, 112)'],
      },
    ];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: 50,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  constructor(
    private apiOperationService: ApiOperationService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.getConfig();
    this.loadDatas();
    this.eventListenerSetItem();
  }

  loadDatas() {
    this.filter = {
      shops: this.itensSelecteds.has('shop')? this.itensSelecteds.get('shop') as Shop[] : null,
      chains: this.itensSelecteds.has('chain')? this.itensSelecteds.get('chain') as Chain[] : null,
    };

    forkJoin({
      complete:
        this.apiOperationService.getCountActivityCompleteBetweenDateByBrand(
          this.brands.map(brand => brand.id),
          this.itensSelecteds.has('project')? this.itensSelecteds.get('project') as Project[] : this.projects,
          this.initialDate.toISOString(),
          this.finalDate.toISOString()
        ),
      missing:
        this.apiOperationService.getCountActivityMissingBetweenDateByBrand(
          this.brands.map(brand => brand.id),
          this.itensSelecteds.has('project')? this.itensSelecteds.get('project') as Project[] : this.projects,
          this.initialDate.toISOString(),
          this.finalDate.toISOString()
        ),
      valuesToFilter: this.apiOperationService.getFilterToActivitionCard(
        this.initialDate.toISOString(),
        this.finalDate.toISOString(),
        this.brands.map(brand => brand.id)
      ),
    })
    .pipe(finalize(()=>{
      this.isLoadingValues = false;
      this.chart.update();
    } ))
    .subscribe((data) => {
      this.doughnutChartDatasets[0].data.length = 0;
      this.realizado = data.complete;
      this.pendente = data.missing;
      this.valuesToFilter = data.valuesToFilter;
      this.doughnutChartDatasets[0].data.push(this.realizado);
      this.doughnutChartDatasets[0].data.push(this.pendente);
      this.percentual = (
        (this.realizado / (this.realizado + this.pendente)) *
        100
      ).toFixed(1);
    });
  }

  loadDatasWithFilter() {
    //this.isLoadingValues = true;
    this.filter = {
      projects :this.itensSelecteds.has('project')? this.itensSelecteds.get('project') as Project[] : this.projects,
      shops: this.itensSelecteds.has('shop')? this.itensSelecteds.get('shop') as Shop[] : null,
      chains: this.itensSelecteds.has('chain')? this.itensSelecteds.get('chain') as Chain[] : null,
    };

    forkJoin({
      complete:
        this.apiOperationService.getCountActivityCompleteBetweenDateByBrandUsingFilter(
          this.brands.map(brand => brand.id),
          this.initialDate.toISOString(),
          this.finalDate.toISOString(),
          this.filter
        ),
      missing:
        this.apiOperationService.getCountActivityMissingBetweenDateByBrandUsingFilter(
          this.brands.map(brand => brand.id),
          this.initialDate.toISOString(),
          this.finalDate.toISOString(),
          this.filter
        ),
        valuesToFilter: this.apiOperationService.getFilterToActivitionCard(
          this.initialDate.toISOString(),
          this.finalDate.toISOString(),
          this.brands.map(brand => brand.id)
        )
    }).pipe(finalize(()=>{
      this.isLoadingValues = false;
      this.chart.update();

    })).subscribe(data =>{
      this.valuesToFilter = data.valuesToFilter;
      this.doughnutChartDatasets[0].data.length = 0;
      this.realizado = data.complete;
      this.pendente = data.missing;
      this.doughnutChartDatasets[0].data.push(this.realizado);
      this.doughnutChartDatasets[0].data.push(this.pendente);
      this.percentual = (
        (this.realizado / (this.realizado + this.pendente)) *
        100
      ).toFixed(1);
    })
  }

  //Captura event do MultiSelect, que envia dados selecionados
  //Necessário ter o "type" como "activation"
  eventListenerSetItem() {
    EventEmiterService.get('set-item').subscribe((data) => {
      if ((data.type == 'activation')) {
        this.showButtonFilter = true;
        this.loadItensSelected(data);
      }
    });
  }

  //Filtra dados na API
  getDatas(){
    this.loadDatasWithFilter()
  }

  //Função que trata o controle da lista de itens do filtro selecionado
  loadItensSelected(item: any) {
    if (item.itens.length == 0) {
      if (this.itensSelecteds.has(item.id)) {
        this.itensSelecteds.get(item.id).length = 0;
        this.itensSelecteds.delete(item.id);
      }
    } else {
      if (this.itensSelecteds.has(item.id)) {
        this.itensSelecteds.get(item.id).length = 0;
        this.itensSelecteds.get(item.id).push(...item.itens);
      } else {
        this.itensSelecteds.set(item.id, item.itens);
      }
    }
  }


  //Recupera as configuracõe globais do ConfigService
  getConfig(){
    this.configService.getConfig().subscribe(config => {
      this.initialDate = config.initialDate;
      this.finalDate = config.finalDate;
      this.brands = config.brands;
      this.projects = config.projects;
    })
  }

  //Emite evento que envia objeto como elementos para download
  emitObservableToDownload(event:any){
    if(event == 'exportar'){
      this.download = {
        filename :"previstorealizado",
        observable: this.apiOperationService.getPrevistoRealizadoToDownload(this.filter),
        type:"xlsx"
      }
    }
  }
}
