import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { environment } from 'src/environments/environment';
import { DataFileDetails } from '../../model/detail/datafile-details';
import { FilterDatatableDTO } from '../../model/detail/filter-datatable.dto';
import { Filter } from '../../model/filter';
import { DataFilePhoto } from '../../model/gallery/datafile-photo';
import { FilterGalleryDTO } from '../../model/gallery/filter-gallery.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiPainelService {
  url = '192.168.1.15';

  constructor(private http: HttpClient) {}
  getDataDetails(filter: Filter) {
    const headers = { 'content-type': 'application/json' };

    let params = new HttpParams()
      .set('initialDate', filter.initialDate)
      .set('finalDate', filter.finalDate)
      .set('idBrand', filter.idBrand);
    const str = this.transformMapInStringArray(filter.filter);

    return this.http.post<DataFileDetails[]>(
      environment.apiUrlServer+'/datafile/details/',
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

    return this.http.post<DataFilePhoto[]>(
      environment.apiUrlServer+'/datafile/photos/',
      str,
      { headers: headers, params: params }
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
      environment.apiUrlServer+'/filter/datatable',
      { params }
    );
  }

  getFilterToActivitionCard(
    initialDate: string,
    finalDate: string,
    brandId: any
  ) {
    let params = new HttpParams({
      fromObject: {
        initialDate: initialDate,
        finalDate: finalDate,
        brandId: String(brandId),
      },
    });
    return this.http.get<FilterActivationDTO>(
      environment.apiUrlServer+'/filter/activation',
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
      environment.apiUrlServer+'/filter/gallery',
      { params }
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
    return this.http.get(environment.apiUrlServer+'/detail/ruptura', { params });
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
    return this.http.get(environment.apiUrlServer+'/detail/validity', { params });
  }

  getDetailsToDownload(filter: Filter) {
    const headers = { 'content-type': 'application/json' };
    let params = new HttpParams()
      .set('initialDate', filter.initialDate)
      .set('finalDate', filter.finalDate)
      .set('idBrand',filter.idBrand);
    const str = this.transformMapInStringArray(filter.filter);

    return this.http.post(environment.apiUrlServer+'/report/details', str, {
      responseType: 'blob',
      params,
      headers,
    });
  }

  generateBookPhotos(filter: Filter) {
    const headers = { 'content-type': 'application/json' };
    let params = new HttpParams()
      .set('initialDate', filter.initialDate)
      .set('finalDate', filter.finalDate)
      .set('idBrand', filter.idBrand);
    const str = this.transformMapInStringArray(filter.filter);
    return this.http.post(environment.apiUrlServer+'/book', str, {
      responseType: 'blob',
      params,
      headers,
    });
  }

  getRupturaToDownload(
    idBrand: number,
    initialDate: string,
    finalDate: string
  ): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    let params = new HttpParams()
      .set('initialDate', initialDate)
      .set('finalDate', finalDate)
      .set('idBrand', idBrand);
    return this.http.post(environment.apiUrlServer+'/report/ruptura', '', {
      responseType: 'blob',
      params,
      headers,
    });
  }

  getValidadeToDownload(
    idBrand: number,
    initialDate: string,
    finalDate: string
  ): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    let params = new HttpParams()
      .set('initialDate', initialDate)
      .set('finalDate', finalDate)
      .set('idBrand', idBrand);
    return this.http.post(environment.apiUrlServer+'/report/validade', '', {
      responseType: 'blob',
      params,
      headers,
    });
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
