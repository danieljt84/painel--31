import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataFileDetails } from '../model/detail/datafile-details';
import { FilterDatatableDTO } from '../model/detail/filter-datatable.dto';
import { DataFilePhoto } from '../model/gallery/datafile-photo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getDataDetails(){
    return this.http.get<DataFileDetails[]>("http://localhost:8080/datafile/details/"+0);
 }
  getDataPhotos(idBrand:number){
     return this.http.get<DataFilePhoto[]>("http://localhost:8080/datafile/photos/"+0);
  }
  getFilterPhotos(idBrand:number){
    return this.http.get<DataFilePhoto[]>("http://localhost:8080/datafile/photos/filter/"+0);
  }

  getFilterToDataTable(initialDate: string, finalDate: string, brandId:number=0 ){
    let params = new HttpParams({fromObject:{
      'initialDate':initialDate,
      'finalDate':finalDate,
      'brandId':""+{brandId}
    }});
   return this.http.get<FilterDatatableDTO>("http://localhost:8080/filter/datatable")
  }
}
