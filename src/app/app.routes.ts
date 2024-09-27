import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: { title: 'Home' },
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/list/list.component').then((m) => m.ListComponent),
    data: { title: 'List' },
  },
  {
    path: 'add-product',
    loadComponent: () =>
      import('./pages/add-product/add-product.component').then(
        (m) => m.AddProductComponent
      ),
    data: { title: 'List' },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    data: { title: 'Not Found' },
  },
];
