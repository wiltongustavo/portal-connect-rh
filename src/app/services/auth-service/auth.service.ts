import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRequestDTO } from '../../interfaces/IAutRequestDTO';
import { IAuthResponseDTO } from '../../interfaces/IAuthResponseDTO';

@Injectable({
  providedIn: 'root', // A service estará disponível globalmente (singleton)
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/v1';
  constructor(private http: HttpClient) {}

  Authentication(payload: IAuthRequestDTO): Observable<IAuthResponseDTO> {
    return this.http.post<IAuthResponseDTO>(`${this.apiUrl}/auth/login`, payload);
  }
}
