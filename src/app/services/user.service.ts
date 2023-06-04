import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { config, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../model/brand';
import { Config } from '../model/config';
import { Project } from '../model/project';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router,private configService:ConfigService) {}

  logar(user: User): Observable<any> {
    return this.httpClient
      .post<any>(environment.apiUrlServer + '/login', user)
      .pipe(
        tap((resposta) => {
          localStorage.setItem('token', JSON.stringify(resposta['token']));
          localStorage.setItem('user', JSON.stringify(resposta['user']));
          localStorage.setItem('expired', JSON.stringify(resposta['expired']));
          let config: Config = {
            brands: this.obterBrands,
            projects: this.obterProjects,
            initialDate: new Date(),
            finalDate: new Date(),
          }
          this.configService.setConfig(config);
          this.configService.setDefaultBrands(this.obterBrands);
          this.configService.setDefaultProject(this.obterProjects);
        })
      );
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  get obterUsuarioLogado(): User {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  }
  get obterIdUsuarioLogado(): string {
    return localStorage.getItem('user')
      ? (JSON.parse(localStorage.getItem('user')) as User).id
      : null;
  }
  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token'))
      : null;
  }
  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
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
