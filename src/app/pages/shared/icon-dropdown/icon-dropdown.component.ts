import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { Observable } from "rxjs";
import { outputAst } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDownloadComponent } from '../modal-download/modal-download.component';
import { StickyDirection } from '@angular/cdk/table';
import { Download } from 'src/app/model/download';


@Component({
  selector: 'app-icon-dropdown',
  templateUrl: './icon-dropdown.component.html',
  styleUrls: ['./icon-dropdown.component.scss']
})
export class IconDropdownComponent implements OnInit, OnChanges {

  @Input() type: string;
  @Input() filter: FilterActivationDTO;
  @Input() download: Download;
  @Output() eventGetObservable =  new EventEmitter<string>();
  constructor(private modalService: NgbModal) { }


  ngOnChanges(changes: SimpleChanges): void {
     if(changes['download'] && !changes['download'].isFirstChange()){
      const modal = this.modalService.open(ModalDownloadComponent);
      modal.componentInstance.download = this.download;
     }
  }

  ngOnInit(): void {
  }

  emitEventAction(action:string){
    this.eventGetObservable.emit(action);
  }

}
