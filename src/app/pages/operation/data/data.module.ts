import { DataComponent } from './data.component';
import { dataRoutes } from './data.routes';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataTableComponent } from './data-table/data-table.component';
import {MatPaginatorIntl,MatPaginatorModule,} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormFilterComponent } from './form-filter/form-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NavModule } from '../../shared/nav/nav.module';
import { MultiSelectModule } from '../../shared/multi-select/multi-select.module';


@NgModule({
  declarations: [
    DataComponent,
    DataTableComponent,
    FormFilterComponent
    ],
  imports: [
    RouterModule.forChild(dataRoutes),
    CommonModule,
    NavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
  ],
  providers: [],
  bootstrap: [DataComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DataModule {}
