import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-page-component',
  imports: [CommonModule, RouterModule, RouterOutlet],
  standalone: true,
  templateUrl: './auth-page-component.html',
  styleUrl: './auth-page-component.scss'
})
export class AuthPageComponent {

}
