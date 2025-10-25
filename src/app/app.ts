import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModulesModule } from './shared/shared-modules';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModulesModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portal-connect-rh');
}
