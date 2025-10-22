import { Routes } from '@angular/router'
import { AuthPageComponent } from '../pages';

export const routes: Routes = [
    {
        path: 'auth',
        // Agora o Angular/Vite sabe exatamente onde buscar o componente
        component: AuthPageComponent,
        children: [
            // Corrigindo o loadComponent para o padrão Angular (incluindo '.component')
            {
                path: 'login',
                loadComponent: () =>
                    import('../pages/auth-page/login-form')
                        .then(m => m.LoginForm)
            },
            {
                path: 'reset-password',
                loadComponent: () =>
                    import('../pages/auth-page/password-form')
                        .then(m => m.ResetPasswordPageComponent)
            },
            {
                path: 'create-account',
                loadComponent: () =>
                    import('../pages/auth-page/create-account-form')
                        .then(m => m.CreateAccountForm)
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
];
