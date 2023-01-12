import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticFinanceComponent } from './analytic-finance.component';
import { CardChartFaturamentoComponent } from './card-chart-faturamento/card-chart-faturamento.component';
import { RouterModule, Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { DataTableFaturamentoComponent } from './data-table-faturamento/data-table-faturamento.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardInfoComponent } from './card-info/card-info.component';
import { ExpandedDataTableFaturamentoComponent } from './data-table-faturamento/expanded-data-table-faturamento/expanded-data-table-faturamento.component';

const routes:Routes = [{
  path:'', component:AnalyticFinanceComponent
}]

@NgModule({
  declarations: [
    AnalyticFinanceComponent,
    CardChartFaturamentoComponent,
    DataTableFaturamentoComponent,
    CardInfoComponent,
    ExpandedDataTableFaturamentoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgChartsModule,
    NzTableModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AnalyticFinanceModule { }
