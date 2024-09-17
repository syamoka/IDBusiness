import { Routes } from '@angular/router';
import { loginGuard } from './auth/guards/login/login.guard';
import { authGuard } from './auth/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashbard.routes').then((r) => r.DASHBOARD_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
