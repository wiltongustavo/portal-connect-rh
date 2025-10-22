import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';


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

  ],
  standalone: true,
  templateUrl: './create-account-form.html',
  styleUrl: './create-account-form.scss'
})
export class CreateAccountForm {
  form: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Dados enviados:', this.form.value);
      // Chamada de API ou navegação aqui
    }
  }

  cancelar() {
    this.form.reset()
  }
  return(): void {
    this.router.navigate(['./auth/login'])
  }
}
