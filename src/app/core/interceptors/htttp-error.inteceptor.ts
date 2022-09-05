import {  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, EMPTY, Observable, throwError } from "rxjs";

Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {


  constructor(){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('Ocorreu um erro:', error.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.error(`Servidor retornou: ${error.status}: ${error.error}`);
              }
      
              // If you want to return a new response:
              //return of(new HttpResponse({body: [{name: "Default value..."}]}));
      
              // If you want to return the error on the upper level:
              return throwError(()=> error);
      
              // or just return nothing:
           
              //return EMPTY;
            })
          );
    }
    
}