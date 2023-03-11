import { AppComponent } from './app.component';
import { appRotas } from './app.routes';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './core/interceptors/token.inteceptor';
import { NavModule } from './pages/shared/nav/nav.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NavModule,
    NgMultiSelectDropDownModule.forRoot(),
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
