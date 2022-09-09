import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataFileDetails } from '../model/detail/datafile-details';
import { FilterDatatableDTO } from '../model/detail/filter-datatable.dto';
import { Filter } from '../model/filter';
import { DataFilePhoto } from '../model/gallery/datafile-photo';
import { FilterGalleryDTO } from '../model/gallery/filter-gallery.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getDataDetails(filter: Filter) {
    const headers = { 'content-type': 'application/json'}  

    let params = new HttpParams()
      .set('initialDate', filter.initialDate)
      .set('finalDate', filter.finalDate)
      .set('idBrand', filter.idBrand);
    const str = this.transformMapInStringArray(filter.filter);
    
    return this.http.post<DataFileDetails[]>(
      'http://localhost:8080/datafile/details/',str,
      {'headers':headers,'params':params}
    );
  }
  getDataPhotos(filter: Filter) {
    const headers = { 'content-type': 'application/json'}  

    let params = new HttpParams()
      .set('initialDate', filter.initialDate)
      .set('finalDate', filter.finalDate)
      .set('idBrand', filter.idBrand);
    const str = this.transformMapInStringArray(filter.filter);
    
    return this.http.post<DataFilePhoto[]>(
      'http://localhost:8080/datafile/photos/',str, {'headers':headers,'params':params}
      );
  }

  getFilterToDataTable(
    initialDate: string,
    finalDate: string,
    brandId: number = 0
  ) {
    let params = new HttpParams({
      fromObject: {
        initialDate: initialDate,
        finalDate: finalDate,
        brandId: String(brandId),
      },
    });
    return this.http.get<FilterDatatableDTO>(
      'http://localhost:8080/filter/datatable',
      { params }
    );
  }

  getFilterToGallery(
    initialDate: string,
    finalDate: string,
    brandId: number = 0
  ) {
    let params = new HttpParams({
      fromObject: {
        initialDate: initialDate,
        finalDate: finalDate,
        brandId: String(brandId),
      },
    });
    return this.http.get<FilterGalleryDTO>(
      'http://localhost:8080/filter/gallery',
      { params }
    );
  }

  private replacer(key:any, value:Map<string,string[]>) {
      let body ='{filter:'+this.transformMapInStringArray(value)+'}'
      return body;
  }

  transformMapInStringArray(map:Map<string,string[]>){
    let index = 1;
    let string ='{"filter":{';

    map.forEach((value,key,m) =>{
      string = string +'"'+ key +'":'+ JSON.stringify(value) +"";

      if(index<m.size){
        string = string + ',';
      }

      index++;
    })

    return string +'}}';
  }
}
