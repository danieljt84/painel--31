import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, Observable } from "rxjs";
import { FilterActivationDTO } from "src/app/model/analytic/filter-activation.dto";
import { Filter } from "src/app/model/filter";

@Injectable({
    providedIn: 'root',
  })
export class ApiOperationService{

    url = "http://localhost:8081";

    constructor(private http: HttpClient) {}
    
    getCountActivityCompleteByBrand(brand: string, date: string):Observable<number>{
        let params = new HttpParams()
        .set('brand', brand)
        .set('date', date);
       return this.http.get<number>(this.url+"/datatask/countactivitycompletebybrand",{params});
    }
    getCountActivityDoingByBrand(brand: string, date: string){
        let params = new HttpParams()
        .set('brand', brand)
        .set('date', date);
       return this.http.get<number>(this.url+"/datatask/countactivitydoingbybrand",{params});
    }
    getCountActivityMissingByBrand(brand: string, date: string){
        let params = new HttpParams()
        .set('brand', brand)
        .set('date', date);
       return this.http.get<number>(this.url+"/datatask/countactivitymissingbybrand",{params});
    }
    getCountActivityCompleteBetweenDateByBrand(brand: string, initialDate: string,finalDate: string):Observable<number>{
      const headers = { 'content-type': 'application/json'}  
      let params = new HttpParams()
      .set('brand', brand)
      .set('initialDate', initialDate)
      .set('finalDate', finalDate);

      return this.http.get<number>(this.url+"/datatask/countactivitycompletebetweendatebybrand",{params,headers});
    }
    getCountActivityCompleteBetweenDateByBrandUsingFilter(filter:Filter):Observable<number>{
        const headers = { 'content-type': 'application/json'}  
        let params = new HttpParams()
        .set('brand', filter.idBrand)
        .set('initialDate', filter.initialDate)
        .set('finalDate', filter.finalDate);
        const str = this.transformMapInStringArray(filter.filter);

        return this.http.post<number>(this.url+"/datatask/countactivitycompletebetweendatebybrand",str,{params,headers});
    }
    getCountActivityMissingBetweenDateByBrand(brand: string, initialDate: string,finalDate: string):Observable<number>{
        let params = new HttpParams()
        .set('brand', brand)
        .set('initialDate', initialDate)
        .set('finalDate', finalDate);
        return this.http.get<number>(this.url+"/datatask/countactivitymissingbetweendatebybrand",{params});
    }
    getCountActivityMissingBetweenDateByBrandUsingFilter(filter:Filter):Observable<number>{
        const headers = { 'content-type': 'application/json'}  

        let params = new HttpParams()
        .set('brand', filter.idBrand)
        .set('initialDate', filter.initialDate)
        .set('finalDate', filter.finalDate);
        const str = this.transformMapInStringArray(filter.filter);
        return this.http.post<number>(this.url+"/datatask/countactivitymissingbetweendatebybrand",str,{params,headers});
    }
    getCountActivityCompleteWithDateBetweenDateByBrand(brand: string, initialDate:string, finalDate:string):Observable<any>{
        let params = new HttpParams()
        .set('brand', brand)
        .set('initialDate', initialDate)
        .set('finalDate', finalDate);
        return this.http.get<number>(this.url+"/datatask/countactivitycompletewithdatebetweendatebybrand",{params});
    }
    getCountActivityCompleteWithDateBetweenDateByBrandWithFilter(filter:Filter):Observable<any>{
      const headers = { 'content-type': 'application/json'}  

      let params = new HttpParams()
      .set('brand', filter.idBrand)
      .set('initialDate', filter.initialDate)
      .set('finalDate', filter.finalDate);
      const str = this.transformMapInStringArray(filter.filter);
      return this.http.post<number>(this.url+"/datatask/countactivitycompletewithdatebetweendatebybrand",str,{params,headers});
  }
    getFilterToActivitionCard(
      initialDate: string,
      finalDate: string,
      brand: string
    ) {
      let params = new HttpParams({
        fromObject: {
          initialDate: initialDate,
          finalDate: finalDate,
          nameBrand: brand
        },
      });
      return this.http.get<FilterActivationDTO>(
        this.url+'/filter/activation',
        { params }
      );
    }

    getPrevistoRealizadoToDownload(filter:Filter){
      const headers = { 'content-type': 'application/json'}  
      let params = new HttpParams()
      .append('nameBrand', filter.idBrand)
      .append('initialDate', filter.initialDate)
      .append('finalDate', filter.finalDate);

      return this.http.post(this.url+"/report/previstorealizado",params,{responseType:'blob'})
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