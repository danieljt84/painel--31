import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Filter } from '../model/filter';
import { DataFilePhoto } from '../model/gallery/datafile-photo';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataFileDetails } from '../model/detail/datafile-details';

@Injectable({providedIn: 'root'})
export class DataFileService {
    constructor(private httpClient: HttpClient) { }

    getDataDetails(filter: Filter) {
        const headers = { 'content-type': 'application/json' };

        let params = new HttpParams()
          .set('initialDate', filter.initialDate)
          .set('finalDate', filter.finalDate)
          .set('idBrand', filter.idBrand);
        const str = this.transformMapInStringArray(filter.filter);

        return this.httpClient.post<DataFileDetails[]>(
          environment.apiUrlOperation+'/datafile/details/',
          str,
          { headers: headers, params: params }
        );
      }

      getDataPhotos(filter: Filter) {
        const headers = { 'content-type': 'application/json' };

        let params = new HttpParams()
          .set('initialDate', filter.initialDate)
          .set('finalDate', filter.finalDate)
          .set('idBrand', filter.idBrand);
        const str = this.transformMapInStringArray(filter.filter);

        return this.httpClient.post<DataFilePhoto[]>(
          environment.apiUrlOperation+'/datafile/photos/',
          str,
          { headers: headers, params: params }
        );
      }

      getRupturaBetweenDateByBrand(
        idBrand: number,
        initialDate: string,
        finalDate: string
      ): Observable<any> {
        let params = new HttpParams()
          .set('initialDate', initialDate)
          .set('finalDate', finalDate)
          .set('idBrand', idBrand);
        return this.httpClient.get(environment.apiUrlOperation+'/detail/ruptura', { params });
      }

      getValidityBetweenDateByBrand(
        idBrand: number,
        initialDate: string,
        finalDate: string
      ): Observable<any> {
        let params = new HttpParams()
          .set('initialDate', initialDate)
          .set('finalDate', finalDate)
          .set('idBrand', idBrand);
        return this.httpClient.get(environment.apiUrlOperation+'/detail/validity', { params });
      }
}
