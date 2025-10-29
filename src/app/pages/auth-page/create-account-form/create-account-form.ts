import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { CreateAccountService } from '../../../services/create-account';
import { ICreateUserRequestDTO } from '../../../interfaces/ICreateUserRequestDTO';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-account-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  standalone: true,
  templateUrl: './create-account-form.html',
  styleUrl: './create-account-form.scss',
})
export class CreateAccountForm {
  form: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CreateAccountService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  successFeedBackSnackBar() {
    this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
      duration: 3000, // 3 segundos
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  errorFeedBackSnackbar() {
    this.snackBar.open('Erro cadastrar Usuário.', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const payload: ICreateUserRequestDTO = {
        email: formValue?.email,
        name: formValue?.name,
        password: formValue?.password,
        phoneNumber: formValue?.phone,
      };
      this.service.authentication(payload).subscribe({
        next: () => {
          this.form.reset();
          this.successFeedBackSnackBar();
          this.router.navigate(['./auth/login']);
        },
        error: () => {
          this.errorFeedBackSnackbar();
        },
      });
    }
  }

  cancelar() {
    this.form.reset();
  }
  return(): void {
    this.router.navigate(['./auth/login']);
  }
}
