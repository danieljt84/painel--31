import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bonus } from '../model/finance/bonus';

@Injectable({
  providedIn: 'root'
})
export class BonusService {

  constructor(private httpClient:HttpClient) { }

  save(bonus:Bonus){
    return this.httpClient.post(environment.apiUrlOperation+"/bonus/save",bonus);
  }

  findById(id:number){
    return this.httpClient.get<Bonus>(environment.apiUrlOperation+"/bonus/"+id);
  }

  list(){
    return this.httpClient.get<Bonus[]>(environment.apiUrlOperation+"/bonus/list");
  }
}
