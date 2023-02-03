import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserAutenticatedService } from './core/guards/user-autenticated.service';
import { UserNotAutenticatedService } from './core/guards/user-not-autenticated.service';

export const appRotas: Routes =[
    {
        path:'', redirectTo:'analise',pathMatch: 'full'
    },
    {
        path:'dados', loadChildren: ()=> import('./pages/operation/data/data.module').then(x =>x.DataModule), canLoad:[UserAutenticatedService]
    },
    {
        path:'galeria', loadChildren: ()=> import('./pages/operation/gallery/gallery.module').then(x =>x.GalleryModule),canLoad:[UserAutenticatedService]
    },
    {
        path:'login', loadChildren: ()=> import('./pages/login/login.module').then(x =>x.LoginModule),canLoad:[UserNotAutenticatedService]
    },
    {
        path:'analise', loadChildren: ()=> import('./pages/operation/analytic/analytic.module').then(x =>x.AnalyticModule),canLoad:[UserAutenticatedService]

    },
    {
        path:'finance/atividade', loadChildren: ()=> import('./pages/finance/data-activity/data-activity.module').then(x =>x.DataActivityModule),canLoad:[UserAutenticatedService]
    },
    {
      path:'finance/bonus', loadChildren: ()=> import('./pages/finance/bonus/bonus.module').then(x =>x.BonusModule),
    },
    {
      path:'finance/analise', loadChildren: ()=> import('./pages/finance/analytic-finance/analytic-finance.module').then(x =>x.AnalyticFinanceModule),
    },

]
