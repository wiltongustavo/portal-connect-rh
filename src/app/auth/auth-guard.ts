import { Injectable, Inject } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivateChild(): boolean {
    // Verifica se está no navegador (evita erro no SSR)
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    // No SSR, permitir acesso para evitar quebra
    return true;
  }
}
