import { AppComponent } from './app.component';
import { appRotas } from './app.routes';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MultiSelectComponent } from './pages/shared/multi-select/multi-select.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpErrorInterceptor } from './core/interceptors/htttp-error.inteceptor';
import { TokenInterceptor } from './core/interceptors/token.inteceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { IconDropdownComponent } from './pages/shared/icon-dropdown/icon-dropdown.component';
import { ModalDownloadComponent } from './pages/shared/modal-download/modal-download.component';
import { NavModule } from './pages/shared/nav/nav.module';


@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NavModule,
    RouterModule.forRoot(appRotas),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  schemas:[NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
