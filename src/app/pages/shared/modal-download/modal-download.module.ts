import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModalDownloadComponent } from './modal-download.component';



@NgModule({
  declarations: [ModalDownloadComponent],
  imports: [
    CommonModule,
    MatProgressBarModule
    ],
  exports:[ModalDownloadComponent]
})
export class ModalDownloadModule { }
