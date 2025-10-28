import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { IAuthRequestDTO } from '../../../interfaces/IAutRequestDTO';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
  ],
  providers: [AuthService],
  standalone: true,
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  hide = true; // Começa escondida (type="password")

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  successFeedBackSnackBar() {
    this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
      duration: 3000, // 3 segundos
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'], // opcional: customizar via CSS
    });
  }

  errorFeedBackSnackbar() {
    this.snackBar.open('Erro ao fazer login. Verifique suas credenciais.', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  login() {
    const form = this.loginForm.value;
    const payload: IAuthRequestDTO = {
      email: form?.email,
      password: form?.password,
    };
    this.service.authentication(payload).subscribe({
      next: (response) => {
        //salvando token e roles
        this.service.setToken(response?.token);
        this.service.setRoles(response.roles);

        this.successFeedBackSnackBar();
        this.router.navigate(['/home/dash']);
      },
      error: () => {
        this.errorFeedBackSnackbar();
      },
    });
  }
}
