import { AfterViewInit, Component, computed, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from './shared/header/header.component';
import { ToastsContainer } from './shared/toast-container/toast-container.component';
import { CartOverviewComponent } from './cart/component/cart-overview/cart-overview.component';
import { EnhancedCartService } from './articles/services/cart.service';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CartOverviewComponent, ToastsContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  @ViewChild('cart') cartTemplate!: TemplateRef<any>;

  #authService = inject(AuthService);
  #cartService = inject(EnhancedCartService);
  #oAuthStorage = inject(OAuthStorage);

  protected readonly title = signal('HoneyQFE');
  validToken = this.#authService.validToken;
  profile = this.#authService.profile;

  isAdmin = computed(() => {
    this.#authService.validToken();
    return this.#authService.getCurrentRoles().includes('honeyq_admin');
  })

  ngAfterViewInit(): void {
    this.#cartService.registerCartOffCanvasTemplate(this.cartTemplate);
  }

  logout(): void {
    this.#authService.logout();
  }

  openCart(): void {
    this.#cartService.openCartOffCanvas();
  }
}
