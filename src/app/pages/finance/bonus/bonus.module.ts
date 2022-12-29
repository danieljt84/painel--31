import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusComponent } from './bonus.component';
import { DataTableBonusComponent } from './data-table-bonus/data-table-bonus.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterModule } from '@angular/router';
import { bonusRoutes } from './bonus.routes';
import { ExpandedDataTableBonusComponent } from './data-table-bonus/expanded-data-table-bonus/expanded-data-table-bonus.component';
import { ModalBonusComponent } from './modal-bonus/modal-bonus.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModalBonusComponent } from './modal-bonus/data-table-modal-bonus/data-table-modal-bonus.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { MultiSelectModule } from '../../shared/multi-select/multi-select.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [
    BonusComponent,
    DataTableBonusComponent,
    ExpandedDataTableBonusComponent,
    ModalBonusComponent,
    DataTableModalBonusComponent
  ],
  imports: [
    RouterModule.forChild(bonusRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NgbModule,
    NzAutocompleteModule,
    MultiSelectModule,
    NzCheckboxModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BonusModule { }
