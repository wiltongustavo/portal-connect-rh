import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  selector: 'app-email-send-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './email-send-form.html',
  styleUrls: ['./email-send-form.scss']
})
export class EmailSendForm {
    
  private fb = inject(FormBuilder);
  
  // ✅ OUTPUT: Emite o email (string) para o componente pai
  @Output() emailSubmitted = new EventEmitter<string>(); 
  
  emailForm: FormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    if (this.emailForm.valid) {
      // 💡 Ação: Envia o email de volta ao pai
      this.emailSubmitted.emit(this.emailForm.value.email);
    } else {
      this.emailForm.markAllAsTouched();
    }
  }
}