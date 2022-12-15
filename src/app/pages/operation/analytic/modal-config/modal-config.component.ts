import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { EventEmiterService } from 'src/app/services/event-emiter.service';


@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.scss']
})
export class ModalConfigComponent implements OnInit {

  initialDate:FormControl;
  finalDate:FormControl;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initialDate = new FormControl('');
    this.finalDate = new FormControl('');
  }


  emitEventsChanges(){
    EventEmiterService.get('change-date-analytic').emit({
      initialDate:this.initialDate.value,
      finalDate:this.finalDate.value
    })
  }
}
