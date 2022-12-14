import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FilterGalleryDTO } from 'src/app/model/gallery/filter-gallery.dto';
import { FilterActivationDTO } from 'src/app/model/analytic/filter-activation.dto';
import { FilterDatatableDTO } from 'src/app/model/detail/filter-datatable.dto';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FilterService {
  constructor(private httpClient: HttpClient) {}

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
    return this.httpClient.get<FilterGalleryDTO>(
      environment.apiUrlServer+'/filter/gallery',
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
    return this.httpClient.get<FilterActivationDTO>(
      environment.apiUrlOperation+'/filter/activation',
      { params }
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
    return this.httpClient.get<FilterDatatableDTO>(
      environment.apiUrlServer+'/filter/datatable',
      { params }
    );
  }

}
