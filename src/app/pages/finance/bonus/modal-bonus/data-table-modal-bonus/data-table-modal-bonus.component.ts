import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shop } from 'src/app/model/shop';

@Component({
  selector: 'app-data-table-modal-bonus',
  templateUrl: './data-table-modal-bonus.component.html',
  styleUrls: ['./data-table-modal-bonus.component.scss']
})
export class DataTableModalBonusComponent implements OnInit {
  @Input() listOfData : readonly Shop[] = [];
  @Output() setItemEvent = new EventEmitter<Shop[]>();
  shopsSelected: Shop[] = [];
  checked = false;
  ngOnInit(): void {
  }

  setAllItem(){
    if(!this.checked){
      this.shopsSelected.length = 0;
      this.shopsSelected.push(...this.listOfData);
      this.checked = true;
    }else{
      this.shopsSelected.length =0;
      this.checked = false;
    }
  }

  setItem(data:Shop){
    if(this.shopsSelected.includes(data)){
     this.shopsSelected.splice(this.shopsSelected.indexOf(data),1);
    }else{
      this.shopsSelected.push(data);
    }
    this.setItemEvent.emit(this.shopsSelected);
  }


}
