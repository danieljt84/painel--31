import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { format, isThisSecond, subDays } from 'date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { filter, finalize, forkJoin, Observable } from 'rxjs';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { Filter } from 'src/app/model/filter';
import { ApiOperationService } from 'src/app/services/api/api-operation.service';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
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
  finalDate: string;
  initialDate: string;
  filter: Filter;
  valuesToFilter: FilterActivationDTO;
  itensSelecteds = new Map<string, string[]>();
  isLoadingValues = true;
  observableToDownload: Observable<any>;

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
    private apiPainelService: ApiPainelService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.finalDate = format(new Date(), 'yyyy-MM-dd');
    this.initialDate = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    this.loadDatas();
    this.eventListenerSetItem();
    this.eventListenerChangeDate();
  }

  loadDatas() {
    this.filter = {
      finalDate: this.finalDate,
      initialDate: this.initialDate,
      idBrand: this.userService.obterUsuarioLogado.brand.name,
      filter: this.itensSelecteds,
    };

    forkJoin({
      complete:
        this.apiOperationService.getCountActivityCompleteBetweenDateByBrand(
          this.userService.obterUsuarioLogado.brand.name,
          this.initialDate,
          this.finalDate
        ),
      missing:
        this.apiOperationService.getCountActivityMissingBetweenDateByBrand(
          this.userService.obterUsuarioLogado.brand.name,
          this.initialDate,
          this.finalDate
        ),
      valuesToFilter: this.apiOperationService.getFilterToActivitionCard(
        this.filter.initialDate,
        this.filter.finalDate,
        this.userService.obterUsuarioLogado.brand.name
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
    this.filter = {
      finalDate: this.finalDate,
      initialDate: this.initialDate,
      idBrand: this.userService.obterUsuarioLogado.brand.name,
      filter: this.itensSelecteds,
    };

    forkJoin({
      complete:
        this.apiOperationService.getCountActivityCompleteBetweenDateByBrandUsingFilter(
          this.filter
        ),
      missing:
        this.apiOperationService.getCountActivityMissingBetweenDateByBrandUsingFilter(
          this.filter
        ),
        valuesToFilter: this.apiOperationService.getFilterToActivitionCard(
          this.filter.initialDate,
          this.filter.finalDate,
          this.userService.obterUsuarioLogado.brand.name
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
      this.chart.update();
      this.percentual = (
        (this.realizado / (this.realizado + this.pendente)) *
        100
      ).toFixed(1);
    })
  }

  eventListenerSetItem() {
    EventEmiterService.get('set-item').subscribe((data) => {
      if ((data.type == 'activation')) {
        this.loadItensSelected(data);
        this.loadDatasWithFilter()
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

  eventListenerChangeDate(){
    EventEmiterService.get('change-date-analytic')
    .subscribe(data=>{
      console.log('oi');
      this.initialDate = data.initialDate;
      this.finalDate = data.finalDate;
      this.loadDatasWithFilter()
    })
  }

  emitObservableToDownload(event:any){
    if(event.target.value == 'exportar'){
       this.observableToDownload = this.apiOperationService.getPrevistoRealizadoToDownload(this.filter);
    }
  }
}
