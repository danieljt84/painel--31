import { Routes } from '@angular/router';

export const appRotas: Routes =[
    {
        path:'data', loadChildren: ()=> import('./pages/data/data.module').then(x =>x.DataModule)
    },
]