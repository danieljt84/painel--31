import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { Activity } from 'src/app/model/finance/activity';
import { EventData } from 'src/app/model/multiselect/event-data';
import { Shop } from 'src/app/model/shop';
import { ActivityService } from 'src/app/services/activity.service';
import { DataActivityService } from 'src/app/services/data-activity.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';

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
  activities: Activity[];
  values: any=[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  itensSelecteds: string[] = [];
  activitiesSelected:Activity[];
  shopsToShow:Shop[];

  constructor(private activeModal: NgbActiveModal,private formBuilder:FormBuilder,private activityService:ActivityService,private dataActivityService: DataActivityService) { }

  ngOnInit(): void {
  this.eventListenerSetItem();
  this.loadActivities();
  this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      activity :[],
      createdAt:[],
      finishedAt:[],
      daysInWeek:[],
      price:[]
    });
  }

  loadActivities(){
    this.activityService.list().subscribe(data =>{
       this.activities = data;
       this.values = this.activities.map(activity => activity.description)
      });
  }

  eventListenerSetItem() {
    EventEmiterService.get('set-item')
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: EventData) => {
        if ((item.type = 'modal-bonus')) {
          this.loadItensSelected(item);
        }
      });
  }

  loadItensSelected(item:EventData){
    if (item.itens.length == 0) {
      this.itensSelecteds.length = 0;
    } else {
      this.itensSelecteds.length = 0;
      this.itensSelecteds.push(...item.itens);
    }
    this.activitiesSelected = this.activities.filter(activity => this.itensSelecteds.includes(activity.description))

  }

  setTypeBonus(event:any){
    this.typeBonus = event.target.value;
  }

  updateShops(){
   this.dataActivityService
   .getShopsByActivities(this.activitiesSelected.map(activity => activity.id))
   .subscribe(data => this.shopsToShow = data);
  }

}
