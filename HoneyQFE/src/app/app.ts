import { AfterViewInit, Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from './shared/header/header.component';
import { ToastsContainer } from './shared/toast-container/toast-container.component';
import { CartOverviewComponent } from './cart/component/cart-overview/cart-overview.component';
import { EnhancedCartService } from './articles/services/cart.service';

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

  protected readonly title = signal('HoneyQFE');
  validToken = this.#authService.validToken;
  profile = this.#authService.profile;

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
