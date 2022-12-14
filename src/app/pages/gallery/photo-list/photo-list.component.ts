import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize, Subject, Subscription, takeUntil } from 'rxjs';
import { DataPhotoGrid } from 'src/app/model/gallery/data-photo-grid';
import { DataFilePhoto } from 'src/app/model/gallery/datafile-photo';
import { Filter } from 'src/app/model/filter';

import { ApiPainelService } from 'src/app/services/api/api-painel.service';
import { FilterGalleryDTO } from 'src/app/model/gallery/filter-gallery.dto';
import { EventEmiterService } from 'src/app/services/event-emiter.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent implements OnInit, OnDestroy {
  datas: DataFilePhoto[] = [];
  datasGrid: DataPhotoGrid[] = [];
  opened: boolean = false;
  filter: FilterGalleryDTO;
  rows: any[] = [];
  isLoadingDatas = '';
  isAlive = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private apiService: ApiPainelService) {}

  //Recebe a emissão do evento e realiza o carregamento dos dados
  ngOnInit(): void {
    EventEmiterService.get('on-filter-gallery')
      .pipe(takeUntil(this.destroy$))
      .subscribe((filter) => {
        this.loadDatas(filter as Filter);
      });
  }

  loadDatas(filter: Filter) {
    this.isLoadingDatas = "ATIVO";
    this.apiService
      .getDataPhotos(filter)
      .pipe(
        finalize(() => {
          this.isLoadingDatas = "INATIVO";
          this.transform();
          this.rows = this.groupColumns(this.datasGrid);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => (this.datas = data));
  }
  
  //Transforma os dados e um modelo possivel para a exibição nas linhas 
  transform() {
    this.datasGrid = [];
    this.datas.forEach((data) => {
      const dataGrid: DataPhotoGrid = new DataPhotoGrid();
      dataGrid.data = data.date;
      dataGrid.local = data.shop.name;
      dataGrid.empresa = data.brand.name;
      dataGrid.promotor = data.promoter.name;
      dataGrid.ramo = data.project;
      data.photos.forEach((photo) => {
        let newdataGrid: DataPhotoGrid;
        newdataGrid = { ...dataGrid };
        newdataGrid.secao = photo.section;
        newdataGrid.url = photo.url;
        this.datasGrid.push(newdataGrid);
      });
    });
  }

  groupColumns(photos: DataPhotoGrid[]) {
    const newRows = [];

    for (let index = 0; index < photos.length; index += 3) {
      newRows.push(photos.slice(index, index + 3));
    }
    return newRows;
  }

  changeMode() {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
