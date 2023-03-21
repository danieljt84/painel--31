import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { format, isThisSecond, subDays } from 'date-fns';
import { MultiSelectComponent } from 'ng-multiselect-dropdown';
import { BaseChartDirective } from 'ng2-charts';
import { filter, finalize, firstValueFrom, forkJoin, Observable } from 'rxjs';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { Brand } from 'src/app/model/brand';
import { Chain } from 'src/app/model/chain';
import { Download } from 'src/app/model/download';
import { Filter } from 'src/app/model/filter';
import { Project } from 'src/app/model/project';
import { Shop } from 'src/app/model/shop';
import { ApiOperationService } from 'src/app/services/api/api-operation.service';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { ConfigService } from 'src/app/services/config.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { UserService } from 'src/app/services/user.service';

interface ValuesToFilter {
  shop: any[];
  project: any[];
}

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
  private projects: Project[];
  filter: Filter;
  valuesToFilter: ValuesToFilter;
  itensSelecteds = new Map<string, any[]>();
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
    this.eventListenerSetItem();
  }

  loadDatas() {
    console.log(this.itensSelecteds)
    this.filter = {
      shops: this.itensSelecteds.has('shop')
        ? this.itensSelecteds.get('shop').map((element) => element.item_id)
        : null,
      chains: this.itensSelecteds.has('chain')
        ? this.itensSelecteds.get('chain').map((element) => element.item_id)
        : null,
      projects: this.itensSelecteds.has('project')
        ? this.itensSelecteds.get('project').map((element) => element.item_id)
        : this.projects? this.projects.map((element) => element.id) : null,
    };

    forkJoin({
      complete:
        this.apiOperationService.getCountActivityCompleteBetweenDateByBrand(
          this.brands.map((brand) => brand.id),
          formatDate(this.initialDate, 'yyyy-MM-dd','en'),
          formatDate(this.finalDate, 'yyyy-MM-dd','en'),
          this.filter
        ),
      missing:
        this.apiOperationService.getCountActivityMissingBetweenDateByBrand(
          this.brands.map((brand) => brand.id),
          formatDate(this.initialDate, 'yyyy-MM-dd','en'),
          formatDate(this.finalDate, 'yyyy-MM-dd','en'),
          this.filter
        ),
      valuesToFilter: this.apiOperationService.getFilterToActivitionCard(
        format(new Date(this.initialDate), 'yyyy-MM-dd'),
        format(new Date(this.finalDate), 'yyyy-MM-dd'),
        this.brands.map((brand) => brand.id)
      ),
    })
      .pipe(
        finalize(() => {
          this.isLoadingValues = false;
          this.chart.update();
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.doughnutChartDatasets[0].data.length = 0;
        this.realizado = data.complete;
        this.pendente = data.missing;
        this.valuesToFilter = {
          project: this.generateInterfaceToFilter(data.valuesToFilter.project),
          shop: this.generateInterfaceToFilter(data.valuesToFilter.shop),
        };
        console.log(this.valuesToFilter.shop);
        this.doughnutChartDatasets[0].data.push(this.realizado);
        this.doughnutChartDatasets[0].data.push(this.pendente);
        this.percentual = (
          (this.realizado / (this.realizado + this.pendente)) *
          100
        ).toFixed(1);
      });
  }

  //Captura event do MultiSelect, que envia dados selecionados
  //Necessário ter o "type" como "activation"
  eventListenerSetItem() {
    EventEmiterService.get('set-item').subscribe((data) => {
      if (data.type == 'activation') {
        this.showButtonFilter = true;
        this.loadItensSelected(data);
      }
    });
  }

  //Filtra dados na API
  getDatas() {
    this.loadDatas();
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
   getConfig() {
    this.configService.getConfig().subscribe(config =>{
      this.initialDate = config.initialDate;
      this.finalDate = config.finalDate;
      this.brands = config.brands;
      this.projects = config.projects;
      this.loadDatas();
    })
  }

  //Emite evento que envia objeto como elementos para download
  emitObservableToDownload(event: any) {
    if (event == 'exportar') {
      this.download = {
        filename: 'previstorealizado',
        observable: this.apiOperationService.getPrevistoRealizadoToDownload(
          formatDate(this.initialDate, 'yyyy-MM-dd','en'),
          formatDate(this.finalDate, 'yyyy-MM-dd','en'),
          this.brands.map((element) => element.id),
          this.filter
        ),
        type: 'xlsx',
      };
    }
  }

  generateInterfaceToFilter(datas: any[]) {
    return datas.map((data) => {
      return {
        id: data.id,
        item: data.name,
      };
    });
  }
}
