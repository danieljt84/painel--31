import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { subDays } from 'date-fns';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FilterDatatableDTO } from 'src/app/model/detail/filter-datatable.dto';
import { Filter } from 'src/app/model/filter';
import { FilterGalleryDTO } from 'src/app/model/gallery/filter-gallery.dto';
import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { EventEmiterService } from 'src/app/services/event-emiter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-filter-gallery',
  templateUrl: './form-filter-gallery.component.html',
  styleUrls: ['./form-filter-gallery.component.scss'],
})
export class FormFilterGalleryComponent implements OnInit {
  isLoadingValues = true;
  alive: boolean = true;
  filter: Filter;
  valuesToFilter: FilterGalleryDTO;
  initialDate: FormControl;
  finalDate: FormControl;
  itensSelecteds = new Map<string, string[]>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  

  constructor(private apiService: ApiPainelService,private userService:UserService) {}

  ngOnInit(): void {
    this.finalDate = new FormControl();
    this.finalDate.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.initialDate = new FormControl(
      formatDate(subDays(new Date(), 7), 'yyyy-MM-dd', 'en')
    );
    this.loadValuesToFilter(this.initialDate.value, this.finalDate.value,this.userService.obterUsuarioLogado.brand.id);
    this.eventListenerSetItem();
  }

  async loadValuesToFilter(initialDate: string, finalDate: string,idBrand: number) {
    this.apiService
      .getFilterToGallery(initialDate, finalDate,idBrand)
      .pipe(finalize(() => (this.isLoadingValues = false)), takeUntil(this.destroy$))
      .subscribe((data) => (this.valuesToFilter = data));
  }

  //funcao que ouve o evento "set-item"
  //recebe todos os dados selecionados, classificado pelos ids
  eventListenerSetItem() {
    EventEmiterService.get('set-item')
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        if ((item.type = 'gallery')) {
          if (item.itens.length == 0) {
            if (this.itensSelecteds.has(item.id)) {
              this.itensSelecteds
                .get(item.id).length = 0;
                this.itensSelecteds.delete(item.id);
            }
          } else {
            if (this.itensSelecteds.has(item.id)) {
              this.itensSelecteds
                .get(item.id).length = 0;
              this.itensSelecteds.get(item.id).push(...item.itens);
            } else {
              this.itensSelecteds.set(item.id, item.itens);
            }
          }
        }
        console.log(this.itensSelecteds);
      });
  }
  //Emite um evento que sera capturado pela component Photolist
  onFilter(){
    let filter: Filter ={
      finalDate: this.finalDate.value,
      initialDate: this.initialDate.value,
      idBrand: this.userService.obterUsuarioLogado.brand.id,
      filter: this.itensSelecteds
    }
    EventEmiterService.get('on-filter-gallery').emit(filter);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
