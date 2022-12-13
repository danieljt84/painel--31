import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataActivity } from '../model/finance/data-activity';

@Injectable({
  providedIn: 'root'
})
export class DataActivityService {

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<DataActivity[]>(environment.apiUrl+"dataactivity/list");
  }
}
