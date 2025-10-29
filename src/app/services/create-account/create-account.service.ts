import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ICreateUserRequestDTO } from '../../interfaces/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '../../interfaces/ICreateUserResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class CreateAccountService {
  private apiUrl = 'http://localhost:8081/api/v1';

  constructor(private http: HttpClient) {}

  authentication(payload: ICreateUserRequestDTO): Observable<ICreateUserResponseDTO> {
    return this.http.post<ICreateUserResponseDTO>(`${this.apiUrl}/auth/register`, payload);
  }
}
