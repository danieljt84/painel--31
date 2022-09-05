import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";
import {JwtHelperService} from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private userService: UserService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(this.userService.obterTokenUsuario){
        if(jwtHelper.isTokenExpired(this.userService.obterTokenUsuario)){
          this.userService.deslogar();
        }else{
          req = req.clone({
            setHeaders: {
              Authorization: this.userService.obterTokenUsuario
            }      });
        }
      }else{
        this.userService.deslogar();
      }

      return next.handle(req);
    }
}
