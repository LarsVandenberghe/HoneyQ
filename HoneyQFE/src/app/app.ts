import { Component, inject, signal, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from './shared/header/header.component';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './shared/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ToastsContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  #authService = inject(AuthService);
  #offcanvasService = inject(NgbOffcanvas);

  protected readonly title = signal('HoneyQFE');
  validToken = this.#authService.validToken;
  profile = this.#authService.profile;

  logout(): void {
    this.#authService.logout();
  }

  openCart(content: TemplateRef<any>): void {
    this.#offcanvasService.open(content, { position: 'end' });
  }
}
