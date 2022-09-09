import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EventEmiterService } from 'src/app/services/event-emiter.service';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;
  @Input() values: string[];
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};

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
      let id = 0;
      this.values.forEach((value) =>
        this.dropdownList.push({
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
}
