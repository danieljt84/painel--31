import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Brand } from 'src/app/model/brand';
import { ItemSelectedsStorage } from 'src/app/model/itemselectedstorage';
import { MultiSelectData } from 'src/app/model/multiselect/multiselectdata';
import { EventEmiterService } from 'src/app/services/event-emiter.service';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() type: string;
  @Input() values: any[];
  @Input() singleSelection = false;
  @Output() itemsEventEmmiter = new EventEmitter();
  dropdownList: any[] = [];
  selectedItems:| any[] = [];
  dropdownSettings: IDropdownSettings = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values'] && !changes['values'].isFirstChange()) {
      this.values = changes['values'].currentValue;
      this.ngOnInit();
    }
  }
  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Marca todos',
      unSelectAllText: 'Desmarcar todos',
      itemsShowLimit: 6,
      allowSearchFilter: true,
    
    };
    if(this.singleSelection){
      this.dropdownSettings.limitSelection = 1;
    }

    this.transformValuesInDropdownList();
    this.getItemsSelectedsByIdInLocalStorage();

    this.itemsEventEmmiter.emit({
      type: this.type,
      id: this.id,
      itens: this.selectedItems,
    })
  }

  transformValuesInDropdownList() {
    if (this.values) {
      this.dropdownList.length = 0;
      this.dropdownList = [];
      this.values.forEach(
        (value) =>
          (this.dropdownList = this.dropdownList.concat({
            item_id:value.id,
            item_text: value.item,
          }))
      );
    }
  }

  //Evento ligado a troca de elementos selecionados
  //Emite todos os eventos selecionados usando a Id do Input
  emitEventSetItem(event: any) {
    EventEmiterService.get('set-item').emit({
      type: this.type,
      id: this.id,
      itens: this.selectedItems.map((item) => item),
    });
    this.itemsEventEmmiter.emit({
      type: this.type,
      id: this.id,
      itens: this.selectedItems.map((item) => item)})
  }
  emitEventSetItemAll(event: any) {
    this.selectedItems = event.map(
      (item: any) => item
    );
    EventEmiterService.get('set-item').emit({
      type: this.type,
      id: this.id,
      itens: this.selectedItems,
    });

    this.itemsEventEmmiter.emit({
      type: this.type,
      id: this.id,
      itens: this.selectedItems,
    })
  }

  getItemsSelectedsByIdInLocalStorage(){

    try {
      let itemsStorage = (JSON.parse(localStorage.getItem('itemSelecteds')) as ItemSelectedsStorage);
      let element = itemsStorage.items.filter(it => it.type == this.type && it.id == this.id).map(it => it.items);
      if(element)     this.selectedItems.push(...element[0]);
    } catch (error) {
      
    }

  }
}

