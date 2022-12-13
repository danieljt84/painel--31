import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataActivityComponent } from './data-activity.component';
import { RouterModule } from '@angular/router';
import { dataActivityRoutes } from './data-activity.routes';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DataTableDataActivityComponent } from './data-table-data-activity/data-table-data-activity.component';

@NgModule({
  declarations: [
    DataActivityComponent,
    DataTableDataActivityComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dataActivityRoutes),
    NzTableModule,
    NzIconModule,
    NzDividerModule,
  ]
})
export class DataActivityModule { }
