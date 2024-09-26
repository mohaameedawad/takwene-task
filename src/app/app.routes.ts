import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: { title: 'Home' },
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/list/list.component').then((m) => m.ListComponent),
    data: { title: 'List' },
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    data: { title: 'Not Found' },
  },
];
