import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first, forkJoin, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Brand } from 'src/app/model/brand';
import { Project } from 'src/app/model/project';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { ConfigService } from 'src/app/services/config.service';
import { Config } from 'src/app/model/config';
import { format } from 'date-fns';
import { MultiSelectData } from 'src/app/model/multiselect/multiselectdata';
import { ItemSelectedsStorage } from 'src/app/model/itemselectedstorage';

interface ValuesToFilter {
  brand: any[];
  project: any[];
}
@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.scss'],
})
export class ModalConfigComponent implements OnInit {
  initialDate = new FormControl();
  finalDate = new FormControl();
  valueToFilter: ValuesToFilter;
  brands: Brand[];
  projects: Project[];
  private itensSelecteds = new Map<string, any[]>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public activeModal: NgbActiveModal,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {
    this.configService.getConfig().pipe(first()).subscribe((config) => {
      this.initialDate.setValue(
        formatDate(config.initialDate, 'yyyy-MM-dd', 'en')
      );
      this.finalDate.setValue(formatDate(config.finalDate, 'yyyy-MM-dd', 'en'));
      this.brands = this.configService.obterBrands;
      this.projects = this.configService.obterProjects;
      this.valueToFilter = {
        brand: this.generateInterfaceToFilter(this.brands),
        project: this.generateInterfaceToFilter(this.projects),
      };
    });
  }

  //Emite evento quando um campo é filtrado
  setConfig() {
    let config: Config = {
      brands: this.itensSelecteds.has('brand')
        ? this.brands.filter(brand => this.itensSelecteds.get('brand').map(item => item.item_id).includes(brand.id))
        : this.brands,
      projects: this.itensSelecteds.has('project')
        ? (this.itensSelecteds.get('project') as Project[])
        : this.projects
        ? this.projects
        : null,
      initialDate: this.initialDate.value,
      finalDate: this.finalDate.value,
    };
    this.configService.setConfig(config);
  }

  //funcao que ouve o evento "set-item"
  //recebe todos os dados selecionados, classificado pelos ids
  eventListenerSetItem(data: any) {
    if (data.type == 'config') {
      this.loadItensSelected(data);
    }
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
    this.saveItemsSelected(this.itensSelecteds.get(item.id),item.id)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  generateInterfaceToFilter(datas: any[]): any[] {
    if (datas) {
      return datas.map((data) => {
        return <MultiSelectData>{
          id: data.id,
          item: data.name,
        };
      });
    } else {
      return [];
    }
  }

  saveItemsSelected(selecteds:any[],id:string){
    let items = {
      type:'config',
      id: id,
      items: selecteds
    }
    console.log(localStorage.getItem('itemSelecteds'))
    if( localStorage.getItem('itemSelecteds')){
      let itemsStorage = (JSON.parse(localStorage.getItem('itemSelecteds')) as ItemSelectedsStorage);
      itemsStorage.items.filter(it => it.type == 'config' && it.id == id).map(it => it.items = selecteds)
      localStorage.setItem('itemSelecteds',JSON.stringify(itemsStorage))
    }else{
      let itemselectedstorage  = {
        items : [items]
      }
      localStorage.setItem('itemSelecteds',JSON.stringify(itemselectedstorage))
    }

  }
}
