import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Bonus } from 'src/app/model/finance/bonus';
import { BonusService } from 'src/app/services/bonus.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';

@Component({
  selector: 'app-data-table-bonus',
  templateUrl: './data-table-bonus.component.html',
  styleUrls: ['./data-table-bonus.component.scss']
})
export class DataTableBonusComponent implements OnInit,OnDestroy {
  expandSet = new Set<number>();
  listToDisplay:Bonus[];
  bonus:Bonus[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private bonusService:BonusService) { }

  ngOnInit(): void {
    this.loadDatas();
  }

  loadDatas(){
    this.bonusService.list()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data =>{
      this.bonus = data;
      this.listToDisplay = [...this.bonus];
    })
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
