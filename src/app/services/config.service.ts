import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Brand } from '../model/brand';
import { Config } from '../model/config';
import { Project } from '../model/project';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config:Config
  private configData;


  constructor() {
    this.getConfigFromLocalStorage();
    this.configData = new BehaviorSubject<Config>(this.config);
  }

  setConfig(config: Config): void {
    this.addConfigToLocalStorage(config);
    this.configData.next(config);
  }

  getConfig(): Observable<Config> {
    return this.configData.asObservable();
  }

  private addConfigToLocalStorage(config:Config){
    localStorage.setItem('config',JSON.stringify(config))
  }

  private deleteConfigFromLocalStorage(){
    if(localStorage.getItem('config')) localStorage.removeItem('config');
  }

  private getConfigFromLocalStorage(){
    let localConfig = this.config = JSON.parse(localStorage.getItem('config')) as Config;
    if(!this.config && localConfig){
      this.config = localConfig;
    }
  }

  
}
