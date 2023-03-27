import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filter } from '../model/filter';

@Injectable({providedIn: 'root'})
export class DataTaskService {

    constructor(private httpClient: HttpClient) { }

    getCountActivityCompleteByBrand(brand: string, date: string):Observable<number>{
        let params = new HttpParams()
        .set('brand', brand)
        .set('date', date);
       return this.httpClient.get<number>(environment.apiUrlOperation+"/datatask/countactivitycompletebybrand",{params});
    }
    getCountActivityDoingByBrand(brand: string, date: string){
        let params = new HttpParams()
        .set('brand', brand)
        .set('date', date);
       return this.httpClient.get<number>(environment.apiUrlOperation+"/datatask/countactivitydoingbybrand",{params});
    }
    getCountActivityMissingByBrand(brand: string, date: string){
        let params = new HttpParams()
        .set('brand', brand)
        .set('date', date);
       return this.httpClient.get<number>(environment.apiUrlOperation+"/datatask/countactivitymissingbybrand",{params});
    }
    getCountActivityCompleteBetweenDateByBrand(brand: string, initialDate: string,finalDate: string):Observable<number>{
      let params = new HttpParams()
      .set('brand', brand)
      .set('initialDate', initialDate)
      .set('finalDate', finalDate);

      return this.httpClient.get<number>(environment.apiUrlOperation+"/datatask/countactivitycompletebetweendatebybrand",{params});
    }
  
    getCountActivityMissingBetweenDateByBrand(brand: string, initialDate: string,finalDate: string):Observable<number>{
        let params = new HttpParams()
        .set('brand', brand)
        .set('initialDate', initialDate)
        .set('finalDate', finalDate);
        return this.httpClient.get<number>(environment.apiUrlOperation+"/datatask/countactivitymissingbetweendatebybrand",{params});
    }
  
    getCountActivityCompleteWithDateBetweenDateByBrand(brand: string, initialDate:string, finalDate:string):Observable<any>{
        let params = new HttpParams()
        .set('brand', brand)
        .set('initialDate', initialDate)
        .set('finalDate', finalDate);
        return this.httpClient.get<number>(environment.apiUrlOperation+"/datatask/countactivitycompletewithdatebetweendatebybrand",{params});
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
