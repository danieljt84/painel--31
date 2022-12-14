import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EventEmiterService } from 'src/app/services/event-emiter.service';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit, OnChanges {
 
  @Input() id: string;
  @Input() type: string;
  @Input() values: string[];
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['values'] && !changes['values'].isFirstChange()){
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
    this.transformValuesInDropdownList();
  }


  transformValuesInDropdownList() {
    if (this.values) {
      this.dropdownList.length = 0;
      this.dropdownList = [];
      let id = 0;
      this.values.forEach((value) =>
       this.dropdownList= this.dropdownList.concat({
          item_id: id++,
          item_text: value,
        })
      );
    }
  }

  //Evento ligado a troca de elementos selecionados
  //Emite todos os eventos selecionados usando a Id do Input
  emitEventSetItem(event: any) {

      EventEmiterService.get('set-item').emit({
        type: this.type,
        id: this.id,
        itens: this.selectedItems.map(item => item.item_text),
      });
  }
  emitEventSetItemAll(event: any){
    this.selectedItems = event.map((item: { item_text: any; }) => item.item_text);
    EventEmiterService.get('set-item').emit({
      type: this.type,
      id: this.id,
      itens: this.selectedItems
    });
  }
}
