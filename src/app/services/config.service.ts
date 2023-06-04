import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Brand } from '../model/brand';
import { Config } from '../model/config';
import { Project } from '../model/project';
import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config:Config
  private defaultBrands: Brand[];
  private defaultProject: Project[];
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

  setDefaultBrands(brands: Brand[]){
    this.defaultBrands = brands;
  }

  setDefaultProject(projects: Project[]){
    this.defaultProject = projects;
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

  

  get obterBrands(): Brand[] {
    return localStorage.getItem('user')
      ? (JSON.parse(localStorage.getItem('user')) as User).brands
      : null;
  }

  get obterProjects(): Project[] {
    return localStorage.getItem('user')
    ? (JSON.parse(localStorage.getItem('user')) as User).projects
    : null;
  }

  
}
