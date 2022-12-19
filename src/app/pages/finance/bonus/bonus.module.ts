import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusComponent } from './bonus.component';
import { DataTableBonusComponent } from './data-table-bonus/data-table-bonus.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterModule } from '@angular/router';
import { bonusRoutes } from './bonus.routes';
import { ExpandedDataTableBonusComponent } from './data-table-bonus/expanded-data-table-bonus/expanded-data-table-bonus.component';
import { ModalBonusComponent } from './modal-bonus/modal-bonus.component';

@NgModule({
  declarations: [
    BonusComponent,
    DataTableBonusComponent,
    ExpandedDataTableBonusComponent,
    ModalBonusComponent
  ],
  imports: [
    RouterModule.forChild(bonusRoutes),
    CommonModule,
    NzTableModule
  ]
})
export class BonusModule { }
