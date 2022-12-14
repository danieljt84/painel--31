import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter-data-table-data-activity',
  templateUrl: './filter-data-table-data-activity.component.html',
  styleUrls: ['./filter-data-table-data-activity.component.scss']
})
export class FilterDataTableDataActivityComponent implements OnInit {
  valuesToFilter:any;
  isLoadingValues:any;
  itensSelecteds = new Map<string, string[]>();
  destroy$: Subject<boolean> = new Subject<boolean>();
  filter: Filter;

  constructor() { }

  ngOnInit(): void {
  }

  loadValuesToFilter() {
    this.onEditFilter();
    this.apiService
      .getFilterToDataTable(this.initialDate.value, this.finalDate.value, this.userService.obterUsuarioLogado.brand.id)
      .pipe(finalize(() => (this.isLoadingValues = false)),takeUntil(this.destroy$))
      .subscribe((data) => (this.valuesToFilter = data));
  }

  //funcao que ouve o evento "set-item"
  //recebe todos os dados selecionados, classificado pelos ids
  eventListenerSetItem() {
    EventEmiterService.get('set-item')
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        if ((item.type = 'data-activity')) {
          this.loadItensSelected(item);
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
    this.onEditFilter();
  }

  onFilter() {
    EventEmiterService.get('on-filter-data').emit(this.filter);
  }

  onEditFilter() {
    this.filter = {
      finalDate: this.finalDate.value,
      initialDate: this.initialDate.value,
      idBrand: this.userService.obterUsuarioLogado.brand.id,
      filter: this.itensSelecteds,
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
