import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Filter } from 'src/app/model/filter';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ReportService {
    constructor(private httpClient: HttpClient) { }

    getPrevistoRealizadoToDownload(filter:Filter){
        const headers = { 'content-type': 'application/json'}
        let params = new HttpParams()
        .append('idBrand', filter.idBrand)
        .append('initialDate', filter.initialDate)
        .append('finalDate', filter.finalDate);

        return this.httpClient.post(environment.apiUrlOperation+"/report/previstorealizado",params,{responseType:'blob'})
    }

}
