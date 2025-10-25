import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmailSendForm } from '../../../components/auth-components/email-send-form/email-send-form';
import { ResetPassword } from '../../../components/auth-components';

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
    ResetPassword
  ],
  standalone: true,
  templateUrl: './password-form.html',
  styleUrls: ['./password-form.scss']
})
export class ResetPasswordPageComponent { // NOME MANTIDO



  @ViewChild('stepper') stepper!: MatStepper;

  emailSentSuccessfully: boolean = false;
  userEmail: string = '';
  resetToken: string | null = null;

  emailFormGroupPlaceholder: FormGroup;
  passwordFormGroupPlaceholder: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.emailFormGroupPlaceholder = this.fb.group({ dummy: [''] });
    this.passwordFormGroupPlaceholder = this.fb.group({ dummy: [''] });
  }

  handleEmailSubmit(email: string) {
    this.userEmail = email;
    console.log('Iniciando envio de e-mail para:', email);

    setTimeout(() => {
      this.emailSentSuccessfully = true;
      this.resetToken = 'TOKEN_RECEBIDO_DA_API_OU_EMAIL';
      this.stepper.next();
    }, 1500);
  }

  handlePasswordReset(passwords: { newPassword: string, confirmPassword: string }) {
    console.log('Tentando redefinir senha. Nova senha:', passwords.newPassword);

    setTimeout(() => {
      console.log('Senha redefinida com sucesso!');
      this.router.navigate(['/auth/login']);
    }, 1500);
  }

  return(): void {
    this.router.navigate(['./auth/login'])
  }
}