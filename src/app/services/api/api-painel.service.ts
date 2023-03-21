import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { Project } from 'src/app/model/project';
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
  getDataDetails(
    initialDate: string,
    finalDate: string,
    idBrands: number[],
    filter: Filter
  ) {

    return this.http.post<DataFileDetails[]>(
      environment.apiUrlServer + '/datafile/details',
      filter,
      {
        params: {
          initialdate: initialDate,
          finaldate: finalDate,
          idsbrand: idBrands,
        },
      }
    );
  }
  getDataPhotos(  initialDate: string,
    finalDate: string,
    idBrands: number[], filter:Filter) {
    const headers = { 'content-type': 'application/json' };

    let params = new HttpParams({
      fromObject: {
        initialdate: initialDate,
        finaldate: finalDate,
        idsbrand: idBrands,
      },
    });

    return this.http.post<DataFilePhoto[]>(
      environment.apiUrlServer + '/datafile/photos',filter,
      { headers: headers, params: params }
    );
  }

  getFilterToDataTable(
    initialDate: string,
    finalDate: string,
    idBrands: number[]
  ) {
    let params = new HttpParams({
      fromObject: {
        initialDate: initialDate,
        finalDate: finalDate,
        idsBrand: idBrands,
      },
    });
    return this.http.get<FilterDatatableDTO>(
      environment.apiUrlServer + '/filter/datatable',
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
      environment.apiUrlServer + '/filter/activation',
      { params }
    );
  }

  getFilterToGallery(
    initialDate: string,
    finalDate: string,
    idBrands: number[]
  ) {
    let params = new HttpParams({
      fromObject: {
        initialDate: initialDate,
        finalDate: finalDate,
        idsBrand: idBrands,
      },
    });
    return this.http.get<FilterGalleryDTO>(
      environment.apiUrlServer + '/filter/gallery',
      { params }
    );
  }

  getRupturaBetweenDateByBrand(
    initialDate: string,
    finalDate: string,
    idsBrand: number[],
    idsProject:number[]
  ): Observable<any> {
    let params;
    if(idsProject){
       params = new HttpParams({
        fromObject: {
          initialDate: initialDate,
          finalDate: finalDate,
          idsBrand: idsBrand,
          idsProject: idsProject,
        },
      });
    }else{
       params = new HttpParams({
        fromObject: {
          initialDate: initialDate,
          finalDate: finalDate,
          idsBrand: idsBrand,
        },
      });
    }
    


    return this.http.get(environment.apiUrlServer + '/detail/ruptura', {
      params,
    });
  }

  getValidityBetweenDateByBrand(
    initialDate: string,
    finalDate: string,
    idBrands: number[],
    projects:Project[]
  ): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        initialdate: initialDate,
        finaldate: finalDate,
        idsbrand: idBrands,
      },
    });
    return this.http.get(environment.apiUrlServer + '/detail/validity', {
      params,
    });
  }

  getDetailsToDownload(initialDate:string,finalDate:string,idBrands:number[], filter: Filter) {
    const headers = { 'content-type': 'application/json' };
    let params = new HttpParams({
      fromObject: {
        initialDate: initialDate,
        finalDate: finalDate,
        idsBrand: idBrands,
      },
    });
    return this.http.post(environment.apiUrlServer + '/report/details', filter, {
      responseType: 'blob',
      params,
      headers,
    });
  }

  generateBookPhotos(initialDate: string,
    finalDate: string,
    idBrands: number[],
    filter:Filter) {
    const headers = { 'content-type': 'application/json' };
    let params = new HttpParams({
      fromObject: {
        initialDate: initialDate,
        finalDate: finalDate,
        idsBrand: idBrands,
      },
    });
    return this.http.post(environment.apiUrlServer + '/book',filter, {
      responseType: 'blob',
      params,
      headers,
    });
  }

  getRupturaToDownload(
    initialDate: string,
    finalDate: string,
    idsBrand: number[],
    idsProject:number[]
  ): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    let params;
    if(idsProject){
      params = new HttpParams({
       fromObject: {
         initialDate: initialDate,
         finalDate: finalDate,
         idsBrand: idsBrand,
         idsProject: idsProject,
       },
     });
   }else{
      params = new HttpParams({
       fromObject: {
         initialDate: initialDate,
         finalDate: finalDate,
         idsBrand: idsBrand,
       },
     });
   }
    return this.http.post(environment.apiUrlServer + '/report/ruptura', '', {
      responseType: 'blob',
      params,
      headers,
    });
  }

  getValidadeToDownload(
    initialDate: string,
    finalDate: string,
    idBrands: number[],
    project:Project[]
  ): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    let params = new HttpParams({
      fromObject: {
        initialDate: initialDate,
        finalDate: finalDate,
        idBrands: idBrands,
      },
    });
    return this.http.post(environment.apiUrlServer + '/report/validade', '', {
      responseType: 'blob',
      params,
      headers,
    });
  }

 
}
