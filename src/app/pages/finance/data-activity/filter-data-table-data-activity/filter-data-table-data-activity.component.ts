import { Component, OnInit } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FilterDataTableDataActivity } from 'src/app/model/finance/FilterDataTableDataActivity';
import { EventData } from 'src/app/model/multiselect/event-data';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-data-table-data-activity',
  templateUrl: './filter-data-table-data-activity.component.html',
  styleUrls: ['./filter-data-table-data-activity.component.scss'],
})
export class FilterDataTableDataActivityComponent implements OnInit {
  valuesToFilter: any;
  isLoadingValues: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  filter: FilterDataTableDataActivity;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.loadValuesToFilter();
    this.eventListenerSetItem();
  }

  loadValuesToFilter() {
    this.filterService
      .getFilterToDataTableDataActivity(
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
      .subscribe((item: EventData) => {
        if ((item.type = 'data-activity')) {
          this.loadItensSelected(item);
        }
      });
  }

  loadItensSelected(item: EventData) {
    switch (item.id) {
      case 'brand':
        if (item.itens.length == 0) {
          this.filter.brand.length = 0;
        } else {
          this.filter.brand.length = 0;
          this.filter.brand.push(...item.itens);
        }
        break;
      case 'description':
        if (item.itens.length == 0) {
          this.filter.description.length = 0;
        } else {
          this.filter.description.length = 0;
          this.filter.description.push(...item.itens);
        }
        break;
      case 'shop':
        if (item.itens.length == 0) {
          this.filter.shop.length = 0;
        } else {
          this.filter.shop.length = 0;
          this.filter.shop.push(...item.itens);
        }
        break;
      case 'hoursContracted':
        if (item.itens.length == 0) {
          this.filter.hoursContracted.length = 0;
        } else {
          this.filter.hoursContracted.length = 0;
          this.filter.hoursContracted.push(...item.itens);
        }
        break;
      case 'daysInWeekContracted':
        if (item.itens.length == 0) {
          this.filter.daysInWeekContracted.length = 0;
        } else {
          this.filter.daysInWeekContracted.length = 0;
          this.filter.daysInWeekContracted.push(...item.itens);
        }
        break;
    }
  }

  onFilter() {
    EventEmiterService.get('on-filter-data').emit(this.filter);
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
