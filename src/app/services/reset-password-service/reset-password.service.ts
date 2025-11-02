import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ICreateUserResponseDTO } from '../../interfaces/ICreateUserResponseDTO';
import { IResetPasswordRequestDTO, IResetPasswordResponseDTO, IResetPasswordTokenRequestDTO, IResetPasswordTokenResponseDTO } from '../../interfaces/IPasswordTokenResetDTO';


@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private apiUrl = 'http://localhost:8081/api/v1';

  constructor(private http: HttpClient) {}

  generateTokenPost(payload: IResetPasswordTokenRequestDTO): Observable<IResetPasswordTokenResponseDTO> {
    return this.http.post<IResetPasswordTokenResponseDTO>(`${this.apiUrl}/auth/password-reset/request`, payload);
  }

  updatePasswordPost(payload: IResetPasswordRequestDTO): Observable<IResetPasswordResponseDTO> {
    return this.http.post<IResetPasswordResponseDTO>(`${this.apiUrl}/auth/password-reset/complete`, payload);
  }
}
