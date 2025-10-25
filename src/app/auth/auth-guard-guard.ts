import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  // Tenta injetar o Router, mas só funcionará no navegador
  let router: Router | null = null;
  try {
    router = inject(Router);
  } catch {
    // SSR: Router não disponível, apenas retorna true
    return true;
  }

  if (authService.isLoggedIn()) {
    return true;
  } else {
    authService.logout();
    router.navigate(['/auth/login']);
    return false;
  }
};
