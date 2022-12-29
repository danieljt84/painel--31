import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../model/finance/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) { }

  list():Observable<Activity[]>{
    return this.httpClient.get<Activity[]>(environment.apiUrlOperation+"/activity/list")
  }
}
