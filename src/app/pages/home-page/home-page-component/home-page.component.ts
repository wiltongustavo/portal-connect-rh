import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../services/auth-service';

// Interface para garantir a tipagem do array de navegação
interface MenuItem {
  label: string;
  link: string;
  icon?: string; 
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  // 🎯 Imports necessários para todos os componentes HTML (Standalone)
  imports: [
    CommonModule,
    RouterModule, 
    RouterOutlet, // Importante para o componente pai carregar os filhos
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  
  isLoggedIn = true;
  isMobile = false; // Flag para controlar a visibilidade de elementos, se necessário

  // 1. DADOS: O ARRAY que carrega o menu lateral
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
    { label: 'Folha de Pagamento', icon: 'request_page', link: '/payroll' },
    { label: 'Minhas Férias', icon: 'flight_takeoff', link: '/vacation' },
    { label: 'Notificações', icon: 'notifications', link: '/notifications' },
    { label: 'Configurações', icon: 'settings', link: '/settings' },
  ];


  constructor(private breakpoint: BreakpointObserver, private service: AuthService) {
    // 2. LÓGICA DE RESPONSIVIDADE (Ajusta mode/opened do Sidenav)
    this.breakpoint.observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        this.isMobile = result.matches; 
        if (this.sidenav) {
          // Define mode='over' e fechado em telas pequenas, 'side' e aberto em telas grandes
          this.sidenav.mode = result.matches ? 'over' : 'side';
          this.sidenav.opened = !result.matches;
        }
      });
  }

  // Hook para garantir que a lógica seja aplicada após a inicialização
  ngOnInit(): void {
    // Pode-se chamar this.breakpoint.observe aqui se preferir, 
    // mas já está sendo feito no construtor com takeUntilDestroyed().
  }

  // 3. MÉTODOS DE CONTROLE DO SIDENAV
  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  closeIfOver(): void {
    // Fecha o menu se estiver no modo 'over' (mobile)
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  // 4. MÉTODOS DE AUTENTICAÇÃO (Login/Logout)
  login(): void {
    this.isLoggedIn = true;
    // Lógica real de roteamento e autenticação viria aqui
  }

  logout(): void {
    this.isLoggedIn = false;
    this.service.logout()
  }
}