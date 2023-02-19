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
  private configData = new BehaviorSubject<Config>(undefined);


  constructor(private userService:UserService) {
    this.config = {
      initialDate: new Date(),
      finalDate: new Date(),
      brands: this.userService.obterBrands,
      projects: this.userService.obterProjects

    }
  }

  setConfig(config: Config): void {
    this.configData.next(config);
  }

  getConfig(): Observable<Config> {
    return this.configData.asObservable();
  }

  
}
