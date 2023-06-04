import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { Brand } from 'src/app/model/brand';
import { Filter } from 'src/app/model/filter';
import { Project } from 'src/app/model/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiOperationService {
  constructor(private http: HttpClient) {}

  getCountActivityCompleteByBrand(
    idsBrand: number[],
    idsProject: number[],
    date: string
  ): Observable<number> {

    let params = new HttpParams({
      fromObject: {
        date: date,
        idsBrand: idsBrand,
        idsProject: idsProject,
      }});
    return this.http.get<number>(
      environment.apiUrlOperation + '/datatask/countactivitycompletebybrand',
      {
        params: params,
      }
    );
  }
  getCountActivityDoingByBrand(
    idsBrand: number[],
    idsProject: number[],
    date: string
  ) {
    let params = new HttpParams({
      fromObject: {
        date: date,
        idsBrand: idsBrand,
        idsProject: idsProject,
      }});

    return this.http.get<number>(
      environment.apiUrlOperation + '/datatask/countactivitydoingbybrand',
      {
        params,
      }
    );
  }
  getCountActivityMissingByBrand(
    idsBrand: number[],
    idsProject: number[],
    date: string
  ) {
    let params = new HttpParams({
      fromObject: {
        date: date,
        idsBrand: idsBrand,
        idsProject: idsProject,
      }});
    return this.http.get<number>(
      environment.apiUrlOperation + '/datatask/countactivitymissingbybrand',
      {
        params,
      }
    );
  }
  getCountActivityCompleteBetweenDateByBrand(
    idBrands: number[],
    initialDate: string,
    finalDate: string,
    filter?:Filter
  ): Observable<number> {
    const headers = { 'content-type': 'application/json' };

    return this.http.post<number>(
      environment.apiUrlOperation +
        '/datatask/countactivitycompletebetweendatebybrand',filter,
      {
        params: {
          idsBrand: idBrands,
          initialDate: initialDate,
          finalDate: finalDate,
        },
        headers,
      }
    );
  }
  getCountActivityCompleteBetweenDateByBrandUsingFilter(
    idBrands: number[],
    initialDate: string,
    finalDate: string,
    filter: Filter
  ): Observable<number> {
    const headers = { 'content-type': 'application/json' };

    return this.http.post<number>(
      environment.apiUrlOperation +
        '/datatask/countactivitycompletebetweendatebybrand',
      filter,
      {
        params: {
          idBrands: idBrands,
          initialDate: initialDate,
          finalDate: finalDate,
        },
        headers,
      }
    );
  }
  getCountActivityMissingBetweenDateByBrand(
    idBrands: number[],
    initialDate: string,
    finalDate: string,
    filter?: Filter
  ): Observable<number> {
    return this.http.post<number>(
      environment.apiUrlOperation +
        '/datatask/countactivitymissingbetweendatebybrand',filter,
      {
        params: {
          idsBrand: idBrands,
          initialDate: initialDate,
          finalDate: finalDate,
        },
      }
    );
  }
  getCountActivityMissingBetweenDateByBrandUsingFilter(
    idBrands: number[],
    initialDate: string,
    finalDate: string,
    filter?: Filter
  ): Observable<number> {
    const headers = { 'content-type': 'application/json' };

    return this.http.post<number>(
      environment.apiUrlOperation +
        '/datatask/countactivitymissingbetweendatebybrand',
      filter,
      {
        params: {
          idBrands: idBrands,
          initialDate: initialDate,
          finalDate: finalDate,
        },
        headers,
      }
    );
  }
  getCountActivityCompleteWithDateBetweenDateByBrand(
    idBrands: number[],
    initialDate: string,
    finalDate: string,
    filter?: Filter
  ): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        idsBrand: idBrands,
        initialDate: initialDate,
        finalDate: finalDate,
      },
    });
    return this.http.post<number>(
      environment.apiUrlOperation +
        '/datatask/countactivitycompletewithdatebetweendatebybrand',filter,
      {
        params,
      }
    );
  }
  getFilterToActivitionCard(
    initialDate: string,
    finalDate: string,
    idsBrand: number[],
    idsProject:number[]
  ) {
    let params = new HttpParams({
      fromObject: {
        initialDate: initialDate,
        finalDate: finalDate,
        idsBrand: idsBrand,
        idsProject: idsProject
      },
    });
    return this.http.get<FilterActivationDTO>(
      environment.apiUrlOperation + '/filter/activation',
      { params }
    );
  }

  getPrevistoRealizadoToDownload(
    initialDate: string,
    finalDate: string,
    idBrands: number[],
    filter: Filter
  ) {
    const headers = { 'content-type': 'application/json' };
    let params = new HttpParams({
      fromObject: {
        initialDate: initialDate,
        finalDate: finalDate,
        idsBrand: idBrands,
      },
    });

    return this.http.post(
      environment.apiUrlOperation + '/report/previstorealizado',filter,{
        params,
        responseType: 'blob'
      }
     
    );
  }
 
  transformMapInStringArray(map: Map<string, string[]>) {
    let index = 1;
    let string = '{"filter":{';

    map.forEach((value, key, m) => {
      string = string + '"' + key + '":' + JSON.stringify(value) + '';

      if (index < m.size) {
        string = string + ',';
      }

      index++;
    });

    return string + '}}';
  }
}
