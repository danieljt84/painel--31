import { Component, OnInit,AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { FileSaverService } from 'ngx-filesaver'; 
import { Download } from 'src/app/model/download';
import { finalize } from 'rxjs/operators';
import { isThisSecond } from 'date-fns';


@Component({
  selector: 'app-modal-download',
  templateUrl: './modal-download.component.html',
  styleUrls: ['./modal-download.component.scss']
})
export class ModalDownloadComponent implements AfterViewInit {
  
  download:Download
  constructor(public activeModal: NgbActiveModal, private fileSaver: FileSaverService) { }

  ngAfterViewInit(): void {
    this.doAction()
  }

  doAction(){
    this.download.observable
    .pipe(finalize(()=> this.activeModal.close()))
    .subscribe(blob => this.fileSaver.save(blob, this.download.filename+'.'+this.download.type));
  }


}
