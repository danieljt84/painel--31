import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { format, subDays } from 'date-fns';
import { BaseChartDirective } from 'ng2-charts';
import { finalize, forkJoin } from 'rxjs';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { Filter } from 'src/app/model/filter';
import { ApiOperationService } from 'src/app/services/api/api-operation.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-ativacao-grafico-card',
  templateUrl: './ativacao-grafico-card.component.html',
  styleUrls: ['./ativacao-grafico-card.component.scss']
})
export class AtivacaoGraficoCardComponent implements OnInit,AfterViewInit {
  initialDate:string;
  finalDate: string;
  filter: Filter;
  valuesToFilter: FilterActivationDTO;
  itensSelecteds = new Map<string, string[]>();
  isLoadingvalues= true;
  @ViewChild(BaseChartDirective) chartBase: BaseChartDirective;
  public labels: string[] = [ ];
  public datasets= [
    { data: ['']},
  ];
  public options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins:{
      legend:{
        display:false
      }
    }
  };

  constructor(private apiOperationService: ApiOperationService,private userService: UserService) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.initialDate = format(new Date(),'yyyy-MM-dd');
    this.finalDate = format(subDays(new Date(),1),'yyyy-MM-dd');
    this.loadDatas();
    this.eventListenerSetItem();
    this.eventListenerChangeDate();
  }

  loadDatas(){
    this.filter = {
      finalDate: this.initialDate,
      initialDate: this.finalDate,
      idBrand: this.userService.obterUsuarioLogado.brand.name,
      filter: this.itensSelecteds,
    };
    forkJoin({
      complete: this.apiOperationService
      .getCountActivityCompleteWithDateBetweenDateByBrand(this.userService.obterUsuarioLogado.brand.name,this.finalDate,this.initialDate),
      valuesToFilter: this.apiOperationService.getFilterToActivitionCard(this.filter.initialDate,this.filter.finalDate,this.userService.obterUsuarioLogado.brand.name)
    }).pipe(finalize(()=>{
      this.isLoadingvalues = false;
      this.chartBase.update()
    })).subscribe(data =>{
      this.valuesToFilter = data.valuesToFilter;
      let keys = Object.keys(data.complete);
      this.datasets[0].data.length = 0;
      keys.reverse().forEach(key =>{
        this.labels.push(key);
        this.datasets[0].data.push(data.complete[key]);
      })
    })
  }

  loadDatasWithFilter(){
    this.filter = {
      finalDate: this.initialDate,
      initialDate: this.finalDate,
      idBrand: this.userService.obterUsuarioLogado.brand.name,
      filter: this.itensSelecteds,
    };

    forkJoin({
      complete: this.apiOperationService
      .getCountActivityCompleteWithDateBetweenDateByBrandWithFilter(this.filter),
      valuesToFilter: this.apiOperationService.getFilterToActivitionCard(this.filter.initialDate,this.filter.finalDate,this.userService.obterUsuarioLogado.brand.name)
    }).pipe(finalize(()=>{
      this.isLoadingvalues = false;
      this.chartBase.update()
    })).subscribe(data =>{
      this.valuesToFilter = data.valuesToFilter;
      let keys = Object.keys(data.complete);
      this.datasets[0].data.length = 0;
      this.labels = [];
      keys.reverse().forEach(key =>{
        this.labels.push(key);
        this.datasets[0].data.push(data.complete[key]);
      })
    })
  }

  eventListenerSetItem() {
    EventEmiterService.get('set-item').subscribe((data) => {
      if ((data.type == 'activation-chart')) {
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

}
