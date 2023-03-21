import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { format, subDays } from 'date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { finalize, forkJoin } from 'rxjs';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { Brand } from 'src/app/model/brand';
import { Chain } from 'src/app/model/chain';
import { Filter } from 'src/app/model/filter';
import { MultiSelectData } from 'src/app/model/multiselect/multiselectdata';
import { Project } from 'src/app/model/project';
import { Shop } from 'src/app/model/shop';
import { ApiOperationService } from 'src/app/services/api/api-operation.service';
import { ConfigService } from 'src/app/services/config.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { UserService } from 'src/app/services/user.service';
interface ValuesToFilter{
  shop:any[];
  project:any[];
}
@Component({
  selector: 'app-ativacao-grafico-card',
  templateUrl: './ativacao-grafico-card.component.html',
  styleUrls: ['./ativacao-grafico-card.component.scss'],
})

export class AtivacaoGraficoCardComponent implements OnInit, AfterViewInit {
  private finalDate: Date;
  private initialDate: Date;
  private brands: Brand[];
  private projects: Project[]
  filter: Filter;
  valuesToFilter: ValuesToFilter;
  itensSelecteds = new Map<string, Object[]>();
  isLoadingvalues = true;
  @ViewChild(BaseChartDirective) chartBase: BaseChartDirective;
  public labels: string[] = [];
  public datasets = [{ data: [''] }];
  public options = {
    responsive: true,
    maintainAspectRatio: true,
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

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.getConfig()
    this.loadDatas();
    this.eventListenerSetItem();
  }

  loadDatas() {
    this.filter = {
      projects :this.itensSelecteds.has('project')? (this.itensSelecteds.get('project') as Project[]).map(element => element.id) : (this.projects)? this.projects.map(element => element.id):null,
      shops: this.itensSelecteds.has('shop')? (this.itensSelecteds.get('shop') as Shop[]).map(element => element.id) : null,
      chains: this.itensSelecteds.has('chain')? (this.itensSelecteds.get('chain') as Chain[]).map(element => element.id) : null,
    };

    forkJoin({
      complete:
        this.apiOperationService.getCountActivityCompleteWithDateBetweenDateByBrand(
          this.brands.map(brand => brand.id),
          formatDate(this.initialDate, 'yyyy-MM-dd','en'),
          formatDate(this.finalDate, 'yyyy-MM-dd','en'),
        ),
        valuesToFilter: this.apiOperationService.getFilterToActivitionCard(
          formatDate(this.initialDate, 'yyyy-MM-dd','en'),
          formatDate(this.finalDate, 'yyyy-MM-dd','en'),
          this.brands.map(brand => brand.id)
      ),
    })
      .pipe(
        finalize(() => {
          this.isLoadingvalues = false;
          this.chartBase.update();
        })
      )
      .subscribe((data) => {
        this.valuesToFilter ={
          project : this.generateInterfaceToFilter(data.valuesToFilter.project),
          shop : this.generateInterfaceToFilter(data.valuesToFilter.shop),
        }
        let keys = Object.keys(data.complete);
        this.datasets[0].data.length = 0;
        keys.reverse().forEach((key) => {
          this.labels.push(key);
          this.datasets[0].data.push(data.complete[key]);
        });
      });
  }

  eventListenerSetItem() {
    EventEmiterService.get('set-item').subscribe((data) => {
      if (data.type == 'activation-chart') {
        this.loadItensSelected(data);
        this.loadDatas();
      }
    });
  }

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
      this.loadDatas()
    })
  }

  generateInterfaceToFilter = (datas: any[]) => datas.map((data) => {
   return <MultiSelectData>{
     id: data.id,
     item: data.name,
   };
 });
}
