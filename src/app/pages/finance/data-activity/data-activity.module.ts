import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    DataActivityComponent,
    DataTableDataActivityComponent,
    FilterDataTableDataActivityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dataActivityRoutes),
    NzTableModule,
    NzIconModule,
    NzDividerModule,
    MultiSelectModule,
    MatProgressSpinnerModule
  ]
})
export class DataActivityModule { }
