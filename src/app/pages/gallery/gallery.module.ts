import { CommonModule } from '@angular/common';
import {  CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GalleryComponent } from './gallery.component';
import { galleryRoutes } from './gallery.routes';
import { FormFilterGalleryComponent } from './form-filter-gallery/form-filter-gallery.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoComponent } from './photo-list/photo/photo.component';
import { NavModule } from '../shared/nav/nav.module';
import { MultiSelectModule } from '../shared/multi-select/multi-select.module';
import { MultiSelectComponent } from '../shared/multi-select/multi-select.component';

@NgModule({
  declarations: [
    GalleryComponent,
    FormFilterGalleryComponent,
    PhotoListComponent,
    PhotoComponent
  ],
  imports: [
    RouterModule.forChild(galleryRoutes),
    CommonModule,
    MatProgressSpinnerModule,
    FormsModule,
    NavModule,
    ReactiveFormsModule,
    MultiSelectModule
  ],
  providers: [],
  bootstrap: [GalleryComponent],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryModule {}
