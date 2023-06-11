import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbastecimentoComponent } from './abastecimento.component';
import { NavModule } from '../../shared/nav/nav.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  {
      path:'',
      component:AbastecimentoComponent,  
  }
]

@NgModule({
  declarations: [AbastecimentoComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NavModule,
  ]
})
export class AbastecimentoModule { }
