import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { FileSaverService } from 'ngx-filesaver'; 


@Component({
  selector: 'app-modal-download',
  templateUrl: './modal-download.component.html',
  styleUrls: ['./modal-download.component.scss']
})
export class ModalDownloadComponent implements OnInit {
  
  observable:Observable<any>
  filename:string;
  constructor(public activeModal: NgbActiveModal, private fileSaver: FileSaverService) { }

  ngOnInit(): void {
    this.doAction(o)
  }

  doAction(observable:Observable<any>){
    observable.subscribe(blob => this.fileSaver.save(blob, '.zip'))
  }


}
