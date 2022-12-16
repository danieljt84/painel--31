import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataActivity } from '../model/finance/data-activity';
import { FilterDataTableDataActivity } from '../model/finance/FilterDataTableDataActivity';

@Injectable({
  providedIn: 'root'
})
export class DataActivityService {

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<DataActivity[]>(environment.apiUrlOperation+"/dataactivity/list");
  }

  findByFilter(filter:FilterDataTableDataActivity){
    const form={
      brand: filter.brand,
      daysInWeekContracted: filter.daysInWeekContracted,
      description: filter.description,
      hoursContracted: filter.hoursContracted,
      shop: filter.shop,
      project:filter.project
    }
    return this.httpClient.post<DataActivity[]>(environment.apiUrlOperation+"/dataactivity/list",form)
  }
}
