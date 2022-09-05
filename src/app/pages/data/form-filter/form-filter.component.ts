import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { format, subDays } from 'date-fns';
import { finalize, Subject, takeUntil, takeWhile } from 'rxjs';
import { FilterDatatableDTO } from 'src/app/model/detail/filter-datatable.dto';
import { Filter } from 'src/app/model/filter';
import { ApiService } from 'src/app/services/api.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss'],
})
export class FormFilterComponent implements OnInit, OnDestroy {
  alive: boolean = true;
  valuesToFilter: FilterDatatableDTO;
  isLoadingValues = true;
  initialDate: FormControl;
  finalDate: FormControl;
  itensSelecteds = new Map<string, string[]>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.finalDate = new FormControl();
    this.finalDate.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.initialDate = new FormControl(
      formatDate(subDays(new Date(), 7), 'yyyy-MM-dd', 'en')
    );
    this.loadValuesToFilter(
      this.initialDate.value,
      this.finalDate.value,
      this.userService.obterUsuarioLogado.brand.id
    );
    this.eventListenerSetItem();
  }

  async loadValuesToFilter(
    initialDate: string,
    finalDate: string,
    idBrand: number
  ) {
    let data = await this.apiService
      .getFilterToDataTable(initialDate, finalDate, idBrand)
      .toPromise();
    this.valuesToFilter = data;
    this.isLoadingValues = false;
  }

  eventListenerSetItem() {
    EventEmiterService.get('set-item')
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        if ((item.type = 'data')) {
          if (item.itens.length == 0) {
            if (this.itensSelecteds.has(item.id)) {
              this.itensSelecteds
                .get(item.id).length = 0;
                this.itensSelecteds.delete(item.id);
            }
          } else {
            if (this.itensSelecteds.has(item.id)) {
              this.itensSelecteds
                .get(item.id).length = 0;
              this.itensSelecteds.get(item.id).push(...item.itens);
            } else {
              this.itensSelecteds.set(item.id, item.itens);
            }
          }
        }
        console.log(this.itensSelecteds);
      });
  }

  onFilter() {
    let filter: Filter = {
      finalDate: this.finalDate.value,
      initialDate: this.initialDate.value,
      idBrand: this.userService.obterUsuarioLogado.brand.id,
      filter: this.itensSelecteds,
    };
    EventEmiterService.get('on-filter-data').emit(filter);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
