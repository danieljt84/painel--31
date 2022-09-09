import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { analyticRoutes } from './analytic.routes';
import { AnalyticComponent } from './analytic.component';
import { ResumoDiarioCardComponent } from './resumo-diario-card/resumo-diario-card.component';
import { AtivacaoCardComponent } from './ativacao-card/ativacao-card.component';
import { NgChartsModule } from 'ng2-charts';
import { MultiSelectModule } from '../shared/multi-select/multi-select.module';
import { AtivacaoGraficoCardComponent } from './ativacao-grafico-card/ativacao-grafico-card.component';
import { RupturaDataTableComponent } from './ruptura-data-table/ruptura-data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RupturaPeriodoDataTableComponent } from './ruptura-periodo-data-table/ruptura-periodo-data-table.component';
import { NavModule } from '../shared/nav/nav.module';

@NgModule({
  declarations: [
    AnalyticComponent,
    ResumoDiarioCardComponent,
    AtivacaoCardComponent,
    AtivacaoGraficoCardComponent,
    RupturaDataTableComponent,
    RupturaPeriodoDataTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(analyticRoutes),
    NgChartsModule,
    MultiSelectModule,
    MatTableModule,
    MatPaginatorModule,
    NavModule
  ]
})
export class AnalyticModule { }
