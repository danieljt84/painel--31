import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule } from '@angular/router';
import { MultiSelectComponent } from './multi-select.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MultiSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports:[MultiSelectComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class MultiSelectModule { }
