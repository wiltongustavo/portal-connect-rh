import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { IAuthRequestDTO } from '../../interfaces/IAutRequestDTO';
import { IAuthResponseDTO } from '../../interfaces/IAuthResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/v1';
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }

  setRoles(roles: string[]): void {
    if (this.isBrowser) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getRoles(): string[] {
    if (this.isBrowser) {
      const roles = localStorage.getItem('roles');
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }

  authentication(payload: IAuthRequestDTO): Observable<IAuthResponseDTO> {
    return this.http.post<IAuthResponseDTO>(`${this.apiUrl}/auth/login`, payload);
  }
}
