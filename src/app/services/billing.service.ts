import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get(environment.apiUrlOperation+"/billing")
  }
}
