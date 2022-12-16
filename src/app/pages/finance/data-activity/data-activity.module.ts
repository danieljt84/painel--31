import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataActivityComponent } from './data-activity.component';
import { RouterModule } from '@angular/router';
import { dataActivityRoutes } from './data-activity.routes';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DataTableDataActivityComponent } from './data-table-data-activity/data-table-data-activity.component';
import { MultiSelectModule } from '../../shared/multi-select/multi-select.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FilterDataTableDataActivityComponent } from './filter-data-table-data-activity/filter-data-table-data-activity.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CollapseResumoFinanceiroComponent } from './data-table-data-activity/collapse-resumo-financeiro/collapse-resumo-financeiro.component';

@NgModule({
  declarations: [
    DataActivityComponent,
    DataTableDataActivityComponent,
    FilterDataTableDataActivityComponent,
    CollapseResumoFinanceiroComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dataActivityRoutes),
    NzTableModule,
    NzIconModule,
    NzDividerModule,
    MultiSelectModule,
    NzCollapseModule,
    MatProgressSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DataActivityModule { }
