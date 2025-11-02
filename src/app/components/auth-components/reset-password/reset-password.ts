import { Component, EventEmitter, Output, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResetPasswordService } from '../../../services/reset-password-service/reset-password.service';
import { IResetPasswordRequestDTO } from '../../../interfaces/IPasswordTokenResetDTO';

// Função para garantir que a confirmação de senha corresponda
export function passwordMatchValidator(form: FormGroup) {
  const password = form.get('newPassword')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { mismatch: true };
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  // Assumindo que este é o componente 'ResetPassword' referenciado nos imports do Pai
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss'],
})
export class ResetPassword {
  constructor(private service: ResetPasswordService) {}

  @Input() passwordForm!: FormGroup;
  // ✅ INPUT: Recebe o email do componente Pai para exibição

  @Input() resetToken!: string;
  @Input() userEmail!: string;

  // ✅ OUTPUT: Emite as senhas (objeto) para o componente pai
  @Output() passwordSubmitted = new EventEmitter<{
    email: string;
    message: string;
  }>();

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const newPasswordForm = this.passwordForm?.value?.newPassword;
      const payload: IResetPasswordRequestDTO = {
        newPassword: newPasswordForm,
        token: this.resetToken,
      };
      this.service.updatePasswordPost(payload).subscribe({
        next: (response) => {
          const msg = response.message || 'Senha redefinida com sucesso!';
          this.passwordSubmitted.emit({ email: this.userEmail, message: msg });
        },
        error: (error) => {
          const msg = error?.message || 'Erro ao redefinir a senha';
          this.passwordSubmitted.emit({ email: this.userEmail, message: msg });
        },
      });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
