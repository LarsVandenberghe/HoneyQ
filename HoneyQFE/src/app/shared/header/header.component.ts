import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { faArrowRightFromBracket, faBasketShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnhancedCartService } from '../../articles/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [NgbModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  onLogout = output<void>();
  onOpenCart = output<void>();
  profile = input<any>();

  isMenuCollapsed = true;

  #cartService = inject(EnhancedCartService);

  profileName = computed(() => {
    let profile = this.profile();
    if (!profile || !profile?.email){
      return "Unknown Account"
    }
    let name = `${profile.given_name ?? ''} ${profile.family_name ?? ''}`.trim();

    if (name === ""){
      name = profile?.email
    }
    return name;
  })

  cartItemCount = computed(() => this.#cartService.currentCart()?.orderDetails?.length ?? 0);

  faArrowRightFromBracket = faArrowRightFromBracket
  faUser = faUser
  faBasketShopping = faBasketShopping

  logout(): void {
    this.onLogout.emit();
  }

  openCart(): void {
    this.onOpenCart.emit();
  }
}
