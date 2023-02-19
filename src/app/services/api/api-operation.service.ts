import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, Observable } from "rxjs";
import { FilterActivationDTO } from "src/app/model/analytic/filter-activation.dto";
import { Brand } from "src/app/model/brand";
import { Filter } from "src/app/model/filter";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
  })
export class ApiOperationService{


    constructor(private http: HttpClient) {}

    getCountActivityCompleteByBrand(idBrands: number[], date: string):Observable<number>{
       return this.http.get<number>(environment.apiUrlOperation+"/datatask/countactivitycompletebybrand",{
        params:{
          idBrands:idBrands,
          date:date
        }
       });
    }
    getCountActivityDoingByBrand(idBrands: number[], date: string){
       return this.http.get<number>(environment.apiUrlOperation+"/datatask/countactivitydoingbybrand",{
        params:{
          idBrands:idBrands,
          date:date
        }
       });
    }
    getCountActivityMissingByBrand(idBrands: number[], date: string){
       return this.http.get<number>(environment.apiUrlOperation+"/datatask/countactivitymissingbybrand",{
        params:{
          idBrands:idBrands,
          date:date
        }
       });
    }
    getCountActivityCompleteBetweenDateByBrand(idBrand: number, initialDate: string,finalDate: string):Observable<number>{
      const headers = { 'content-type': 'application/json'}
      let params = new HttpParams()
      .set('idBrand', idBrand)
      .set('initialDate', initialDate)
      .set('finalDate', finalDate);

      return this.http.get<number>(environment.apiUrlOperation+"/datatask/countactivitycompletebetweendatebybrand",{params,headers});
    }
    getCountActivityCompleteBetweenDateByBrandUsingFilter(filter:Filter):Observable<number>{
        const headers = { 'content-type': 'application/json'}
        let params = new HttpParams()
        .set('idBrand', filter.idBrand)
        .set('initialDate', filter.initialDate)
        .set('finalDate', filter.finalDate);
        const str = this.transformMapInStringArray(filter.filter);

        return this.http.post<number>(environment.apiUrlOperation+"/datatask/countactivitycompletebetweendatebybrand",str,{params,headers});
    }
    getCountActivityMissingBetweenDateByBrand(idBrand: number, initialDate: string,finalDate: string):Observable<number>{
        let params = new HttpParams()
        .set('idBrand', idBrand)
        .set('initialDate', initialDate)
        .set('finalDate', finalDate);
        return this.http.get<number>(environment.apiUrlOperation+"/datatask/countactivitymissingbetweendatebybrand",{params});
    }
    getCountActivityMissingBetweenDateByBrandUsingFilter(filter:Filter):Observable<number>{
        const headers = { 'content-type': 'application/json'}

        let params = new HttpParams()
        .set('idBrand', filter.idBrand)
        .set('initialDate', filter.initialDate)
        .set('finalDate', filter.finalDate);
        const str = this.transformMapInStringArray(filter.filter);
        return this.http.post<number>(environment.apiUrlOperation+"/datatask/countactivitymissingbetweendatebybrand",str,{params,headers});
    }
    getCountActivityCompleteWithDateBetweenDateByBrand(idBrand: number, initialDate:string, finalDate:string):Observable<any>{
        let params = new HttpParams()
        .set('idBrand', idBrand)
        .set('initialDate', initialDate)
        .set('finalDate', finalDate);
        return this.http.get<number>(environment.apiUrlOperation+"/datatask/countactivitycompletewithdatebetweendatebybrand",{params});
    }
    getCountActivityCompleteWithDateBetweenDateByBrandWithFilter(filter:Filter):Observable<any>{
      const headers = { 'content-type': 'application/json'}

      let params = new HttpParams()
      .set('idBrand', filter.idBrand)
      .set('initialDate', filter.initialDate)
      .set('finalDate', filter.finalDate);
      const str = this.transformMapInStringArray(filter.filter);
      return this.http.post<number>(environment.apiUrlOperation+"/datatask/countactivitycompletewithdatebetweendatebybrand",str,{params,headers});
  }
    getFilterToActivitionCard(
      initialDate: string,
      finalDate: string,
      idBrand: number
    ) {
      let params = new HttpParams({
        fromObject: {
          initialDate: initialDate,
          finalDate: finalDate,
          idBrand: idBrand
        },
      });
      return this.http.get<FilterActivationDTO>(
        environment.apiUrlOperation+'/filter/activation',
        { params }
      );
    }

    getPrevistoRealizadoToDownload(filter:Filter){
      const headers = { 'content-type': 'application/json'}
      let params = new HttpParams()
      .append('idBrand', filter.idBrand)
      .append('initialDate', filter.initialDate)
      .append('finalDate', filter.finalDate);

      return this.http.post(environment.apiUrlOperation+"/report/previstorealizado",params,{responseType:'blob'})
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
