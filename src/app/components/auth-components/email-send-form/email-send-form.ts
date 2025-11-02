import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResetPasswordService } from '../../../services/reset-password-service/reset-password.service';
import {
  IResetPasswordTokenRequestDTO,
  IResetPasswordTokenResponseDTO,
} from '../../../interfaces/IPasswordTokenResetDTO';

@Component({
  selector: 'app-email-send-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './email-send-form.html',
  styleUrls: ['./email-send-form.scss'],
})
export class EmailSendForm {
  resetToken: string = '';
  userEmail: string = '';

  constructor(private service: ResetPasswordService) {}
  @Input() emailForm!: FormGroup;

  // ✅ OUTPUT: Emite o email (string) para o componente pai
  @Output() emailSubmitted = new EventEmitter<{ resetToken: string; userEmail: string }>();

  onSubmit(): void {
    if (this.emailForm.valid && !this.resetToken) {
      const form = this.emailForm.value;
      const paylod: IResetPasswordTokenRequestDTO = {
        email: form?.email,
      };
      this.service.generateTokenPost(paylod).subscribe({
        next: (response) => {
          this.resetToken = response.resetToken;
          this.userEmail = form?.email;
          this.emailSubmitted.emit({ resetToken: this.resetToken, userEmail: this.userEmail });
        },
        error: (err) => {},
      });
    } else {
      this.emailSubmitted.emit({ resetToken: this.resetToken, userEmail: this.userEmail });
      this.emailForm.markAllAsTouched();
    }
  }
}
