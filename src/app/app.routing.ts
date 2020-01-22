import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () =>
          import('./mainPage/mainPage.module').then(m => m.MainPageModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
