import { Component, EventEmitter, Output, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 


// Função para garantir que a confirmação de senha corresponda
export function passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { 'mismatch': true };
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
    MatIconModule
  ],
  // Assumindo que este é o componente 'ResetPassword' referenciado nos imports do Pai
  templateUrl: './reset-password.html', 
  styleUrls: ['./reset-password.scss']
})
export class ResetPassword {
    
  private fb = inject(FormBuilder);
  
  // ✅ INPUT: Recebe o email do componente Pai para exibição
  @Input() email: string | null = null; 

  // ✅ OUTPUT: Emite as senhas (objeto) para o componente pai
  @Output() passwordSubmitted = new EventEmitter<{ newPassword: string, confirmPassword: string }>(); 
  
  passwordForm: FormGroup = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
  }, { validators: passwordMatchValidator });


  onSubmit(): void {
    if (this.passwordForm.valid) {
      // 💡 Ação: Envia as senhas de volta ao pai
      this.passwordSubmitted.emit(this.passwordForm.value);
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}