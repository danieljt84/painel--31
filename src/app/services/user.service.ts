import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  logar(user: User): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:8080' + '/login', user)
      .pipe(
        tap((resposta) => {
          localStorage.setItem('token', JSON.stringify(resposta['token']));
          localStorage.setItem('user', JSON.stringify(resposta['user']));
          localStorage.setItem('expired',JSON.stringify(resposta['expired']))
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
    ? (JSON.parse((localStorage.getItem('user'))) as User).id
    : null;
}
get obterTokenUsuario(): string {
  return localStorage.getItem('token')
    ? JSON.parse((localStorage.getItem('token')))
    : null;
}
get logado(): boolean {
  return localStorage.getItem('token') ? true : false;
}

}
