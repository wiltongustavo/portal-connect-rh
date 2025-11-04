import { Routes } from '@angular/router';
import { AuthPageComponent } from '../pages';
import { HomePageComponent } from '../pages/home-page';
import { AuthGuard } from '../auth';



export const routes: Routes = [
  {
    path: 'auth',
    // Agora o Angular/Vite sabe exatamente onde buscar o componente
    component: AuthPageComponent,
    children: [
      // Corrigindo o loadComponent para o padrão Angular (incluindo '.component')
      {
        path: 'login',
        loadComponent: () => import('../pages/auth-page/login-form').then((m) => m.LoginForm),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('../pages/auth-page/reset-password-form').then((m) => m.ResetPasswordPageComponent),
      },
      {
        path: 'create-account',
        loadComponent: () =>
          import('../pages/auth-page/create-account-form').then((m) => m.CreateAccountForm),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dash',
        loadComponent: () =>
          import('../pages/home-page/home-dashboard').then((m) => m.HomeDashboard),
      },
      {
        path: '',
        redirectTo: 'dash',
        pathMatch: 'full',
      },
    ],
  },
];
