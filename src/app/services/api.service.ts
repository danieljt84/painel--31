import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataFile } from '../model/data-file';
import { DataFileDetails } from '../model/detail/datafile-details';
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
}
