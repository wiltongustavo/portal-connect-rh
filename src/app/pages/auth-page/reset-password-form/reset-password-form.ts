import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmailSendForm } from '../../../components/auth-components/email-send-form/email-send-form';
import { passwordMatchValidator, ResetPassword } from '../../../components/auth-components';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password-page', // NOME MANTIDO

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    EmailSendForm,
    ResetPassword,
  ],
  standalone: true,
  templateUrl: './reset-password-form.html',
  styleUrls: ['./reset-password-form.scss'],
})
export class ResetPasswordPageComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  emailSentSuccessfully: boolean = false;
  resetToken: string = '';
  userEmail: string = '';

  emailFormGroupPlaceholder: FormGroup = new FormGroup({});
  passwordFormGroupPlaceholder: FormGroup = new FormGroup({});

  constructor(private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.initFormEmail();
    this.initFormPassword();
  }

  initFormEmail(): void {
    this.emailFormGroupPlaceholder = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  initFormPassword(): void {
    this.passwordFormGroupPlaceholder = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatchValidator }
    );
  }

  successFeedBackSnackBar() {
    this.snackBar.open('Senha atualizada com sucesso!', 'Fechar', {
      duration: 3000, // 3 segundos
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'], // opcional: customizar via CSS
    });
  }

  errorFeedBackSnackbar() {
    this.snackBar.open('Erro ao atualizar a senha.', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }

  handleEmailSubmit(event: { resetToken: string; userEmail: string }) {
    if (event.resetToken && event.userEmail) {
      this.resetToken = event.resetToken;
      this.userEmail = event.userEmail; // ← importante!
      this.emailSentSuccessfully = true;

      // Avança automaticamente o stepper (opcional)
      this.stepper.next();
    } else {
      this.emailSentSuccessfully = false;
    }
  }

  handlePasswordReset(event: { email: string; message: string }) {
    if (event) {
      this.successFeedBackSnackBar();

      this.return();
    } else {
      this.errorFeedBackSnackbar();
    }
  }

  return(): void {
    this.router.navigate(['./auth/login']);
  }
}
