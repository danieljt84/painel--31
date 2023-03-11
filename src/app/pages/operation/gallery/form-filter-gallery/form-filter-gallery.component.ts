import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { subMonths } from 'date-fns';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Chain } from 'src/app/model/chain';
import { Product } from 'src/app/model/detail/Product';
import { Filter } from 'src/app/model/filter';
import { FilterGalleryDTO } from 'src/app/model/gallery/filter-gallery.dto';
import { MultiSelectData } from 'src/app/model/multiselect/multiselectdata';
import { Project } from 'src/app/model/project';
import { Promoter } from 'src/app/model/promoter';
import { Shop } from 'src/app/model/shop';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-filter-gallery',
  templateUrl: './form-filter-gallery.component.html',
  styleUrls: ['./form-filter-gallery.component.scss'],
})
export class FormFilterGalleryComponent implements OnInit {
  isLoadingValues = true;
  alive: boolean = true;
  valuesToFilter: FilterGalleryDTO;
  initialDate: FormControl;
  finalDate: FormControl;
  itensSelecteds = new Map<string, Object[]>();
  destroy$: Subject<boolean> = new Subject<boolean>();
  filter: Filter;

  constructor(
    private apiService: ApiPainelService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.finalDate = new FormControl();
    this.finalDate.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.initialDate = new FormControl(
      formatDate(subMonths(new Date(), 1), 'yyyy-MM-dd', 'en')
    );
    this.loadValuesToFilter();
    this.eventListenerSetItem();
  }

  async loadValuesToFilter() {
    this.onEditFilter();
    this.apiService
      .getFilterToGallery(
        this.initialDate.value,
        this.finalDate.value,
        this.userService.obterBrands.map((element) => element.id)
      )
      .pipe(
        finalize(() => (this.isLoadingValues = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => (this.valuesToFilter = data));
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
        console.log(this.itensSelecteds);
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

  onEditFilter() {
    this.filter = {
      shops: this.itensSelecteds.has('shop')
        ? (this.itensSelecteds.get('shop') as Shop[]).map(element => element.id)
        : null,
      chains: this.itensSelecteds.has('chain')
        ? (this.itensSelecteds.get('chain') as Chain[]).map(element => element.id)
        : null,
      promoters: this.itensSelecteds.has('promoter')
        ? (this.itensSelecteds.get('promoter') as Promoter[]).map(element => element.id)
        : null,
      products: this.itensSelecteds.has('product')
        ? (this.itensSelecteds.get('product') as Product[]).map(element => element.id)
        : null,
      projects: this.itensSelecteds.has('project')
        ? (this.itensSelecteds.get('project') as Project[]).map(element => element.id)
        : null,
    };
  }

  //Emite um evento que sera capturado pela component Photolist
  onFilter() {
    EventEmiterService.get('on-filter-gallery').emit({
      filter: this.filter,
      initialDate: this.initialDate,
      finalDate: this.finalDate,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  generateInterfaceToFilter(datas: any[]):MultiSelectData[] {
    return datas.map((data) => {
      return <MultiSelectData>
      {
        id: data.id,
        item: data.name,
      };
    });
  }
}
