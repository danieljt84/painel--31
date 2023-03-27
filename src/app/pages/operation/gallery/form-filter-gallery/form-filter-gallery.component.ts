import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { format, subMonths } from 'date-fns';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Config } from 'src/app/model/config';
import { Filter } from 'src/app/model/filter';
import { MultiSelectData } from 'src/app/model/multiselect/multiselectdata';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { ConfigService } from 'src/app/services/config.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { UserService } from 'src/app/services/user.service';
interface ValuesToFilter {
  brands: any[];
  shop: any[];
  product: any[];
  promoter: any[];
  project: any[];
  status: any[];
}
@Component({
  selector: 'app-form-filter-gallery',
  templateUrl: './form-filter-gallery.component.html',
  styleUrls: ['./form-filter-gallery.component.scss'],
})
export class FormFilterGalleryComponent implements OnInit {
  isLoadingValues = true;
  alive: boolean = true;
  valuesToFilter: ValuesToFilter;
  initialDate: FormControl;
  finalDate: FormControl;
  itensSelecteds = new Map<string, any[]>();
  destroy$: Subject<boolean> = new Subject<boolean>();
  filter: Filter;
  config: Config;

  constructor(
    private apiService: ApiPainelService,
    private userService: UserService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.finalDate = new FormControl();
    this.finalDate.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.initialDate = new FormControl(
      formatDate(subMonths(new Date(), 1), 'yyyy-MM-dd', 'en')
    );
    this.getConfig();
    this.eventListenerSetItem();
  }

  async loadValuesToFilter() {
    this.onEditFilter();
    this.apiService
      .getFilterToGallery(
        format(new Date(2020,1,1), 'yyyy-MM-dd'),
        format(new Date(2029,1,1), 'yyyy-MM-dd'),
        this.userService.obterBrands.map((element) => element.id)
      )
      .pipe(
        finalize(() => (this.isLoadingValues = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.valuesToFilter = {
          brands: this.generateInterfaceToFilter(this.config.brands),
          product: this.generateInterfaceToFilter(data.product),
          project: this.generateInterfaceToFilter(data.project),
          promoter: this.generateInterfaceToFilter(data.promoter),
          shop: this.generateInterfaceToFilter(data.shop),
          status: this.generateInterfaceToFilter(data.section),
        };
      });
  }

  //funcao que ouve o evento "set-item"
  //recebe todos os dados selecionados, classificado pelos ids
  eventListenerSetItem() {
    EventEmiterService.get('set-item')
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        if ((item.type = 'gallery')) {
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
        this.onEditFilter();
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
    this.onEditFilter();
  }

  //Emite um evento que sera capturado pela component Photolist
  onFilter() {
    EventEmiterService.get('on-filter-gallery').emit({
      filter: this.filter,
      initialDate: this.initialDate.value,
      finalDate: this.finalDate.value,
    });
  }

  onEditFilter() {
    this.filter = {
      shops: this.itensSelecteds.has('shop')
        ? this.itensSelecteds.get('shop').map((element) => element.item_id)
        : null,
      chains: this.itensSelecteds.has('chain')
        ? this.itensSelecteds.get('chain').map((element) => element.item_id)
        : null,
      promoters: this.itensSelecteds.has('promoter')
        ? this.itensSelecteds.get('promoter').map((element) => element.item_id)
        : null,
      products: this.itensSelecteds.has('product')
        ? this.itensSelecteds.get('product').map((element) => element.item_id)
        : null,
      projects: this.itensSelecteds.has('project')
        ? this.itensSelecteds.get('project').map((element) => element.item_id)
        : null,
      brands: this.itensSelecteds.has('brand')
        ? this.itensSelecteds.get('brand').map((element) => element.item_id)
        : this.config.brands.map((element) => element.id),
    };
  }

  async getConfig() {
    this.configService.getConfig().subscribe((config) => {
      this.config = config;
      this.loadValuesToFilter();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  generateInterfaceToFilter(datas: any[]): MultiSelectData[] {
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
}
