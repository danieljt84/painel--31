import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { Observable } from "rxjs";
import { outputAst } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDownloadComponent } from '../modal-download/modal-download.component';
import { StickyDirection } from '@angular/cdk/table';


@Component({
  selector: 'app-icon-dropdown',
  templateUrl: './icon-dropdown.component.html',
  styleUrls: ['./icon-dropdown.component.scss']
})
export class IconDropdownComponent implements OnInit {

  @Input() type: string;
  @Input() filter: FilterActivationDTO;
  @Input() observable: Observable<any>;
  @Input() action: string;
  @Output() eventGetObservable =  new EventEmitter<Observable<any>>();
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  emitEventAction(event:any){
    this.eventGetObservable.emit(event.value);
    const modal = this.modalService.open(ModalDownloadComponent);
    modal.componentInstance.action = {
      observable: this.observable;
      filename: 
    }
  }

}
