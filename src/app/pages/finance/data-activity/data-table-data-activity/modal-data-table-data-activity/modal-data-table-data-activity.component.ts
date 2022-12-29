import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataActivity } from 'src/app/model/finance/data-activity';
import { DataActivityService } from 'src/app/services/data-activity.service';

@Component({
  selector: 'app-modal-data-table-data-activity',
  templateUrl: './modal-data-table-data-activity.component.html',
  styleUrls: ['./modal-data-table-data-activity.component.scss']
})
export class ModalDataTableDataActivityComponent implements OnInit {

  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataActivity: DataActivity;

  constructor(private dataActivityService:DataActivityService,private activeModal: NgbActiveModal,private formBuilder:FormBuilder ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      activity :[],
      shop: [],
      price: [],
      hoursContracted:[],
      daysInWeekContracted:[]
    })

    if(this.dataActivity){
      this.form.patchValue({
        activity:this.dataActivity.activity.description,
        shop:this.dataActivity.shop.name,
        price:this.dataActivity.price,
        hoursContracted:this.dataActivity.hoursContracted,
        daysInWeekContracted:this.dataActivity.daysInWeekContracted
      })
    }
  }

  save(dataActivity:DataActivity){
    if(this.dataActivity){
      this.dataActivityService.save(dataActivity);
    }
  }


}
