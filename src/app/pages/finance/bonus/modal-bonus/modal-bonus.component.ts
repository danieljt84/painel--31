import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-bonus',
  templateUrl: './modal-bonus.component.html',
  styleUrls: ['./modal-bonus.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalBonusComponent implements OnInit {

  typeBonus = "";
  value = "";
  form: FormGroup
  constructor(private activeModal: NgbActiveModal,private formBuilder:FormBuilder) { }

  ngOnInit(): void {

   this.form = this.formBuilder.group({
      activity :[],
      type:[],
      daysInWeek:[],
      price:[]
    });
  }


}
