import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { analyticRoutes } from './analytic.routes';
import { AnalyticComponent } from './analytic.component';
import { ResumoDiarioCardComponent } from './resumo-diario-card/resumo-diario-card.component';
import { AtivacaoCardComponent } from './ativacao-card/ativacao-card.component';
import { NgChartsModule } from 'ng2-charts';
import { AtivacaoGraficoCardComponent } from './ativacao-grafico-card/ativacao-grafico-card.component';
import { RupturaDataTableComponent } from './ruptura-data-table/ruptura-data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RupturaPeriodoDataTableComponent } from './ruptura-periodo-data-table/ruptura-periodo-data-table.component';
import { AlertaValidadeComponent } from './alerta-validade/alerta-validade.component';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IconConfigComponent } from './icon-config/icon-config.component';
import { ModalConfigComponent } from './modal-config/modal-config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
import { MultiSelectModule } from '../../shared/multi-select/multi-select.module';
import { NavModule } from '../../shared/nav/nav.module';
import { IconDropdownModule } from '../../shared/icon-dropdown/icon-dropdown.module';
import { ModalDownloadModule } from '../../shared/modal-download/modal-download.module';

@NgModule({
  declarations: [
    AnalyticComponent,
    ResumoDiarioCardComponent,
    AtivacaoCardComponent,
    AtivacaoGraficoCardComponent,
    RupturaDataTableComponent,
    RupturaPeriodoDataTableComponent,
    AlertaValidadeComponent,
    IconConfigComponent,
    ModalConfigComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(analyticRoutes),
    NgChartsModule,
    MultiSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    NavModule,
    ReactiveFormsModule,
    IconDropdownModule,
    FileSaverModule,
    ModalDownloadModule
  ]
})
export class AnalyticModule { }
