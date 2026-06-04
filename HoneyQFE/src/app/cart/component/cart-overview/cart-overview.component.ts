import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { EnhancedCartService } from '../../../articles/services/cart.service';
import { faDolly, faQuestion, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart-overview',
  imports: [FontAwesomeModule, CartItemComponent, DecimalPipe],
  templateUrl: './cart-overview.component.html',
  styleUrl: './cart-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartOverviewComponent {
  #cartService = inject(EnhancedCartService);
  onClose = output<string>();

  faTrashCan = faTrashCan
  faDolly = faDolly
  faQuestion = faQuestion

  currentCart = this.#cartService.currentCart
   cartItemCount = computed(() => this.#cartService.currentCart()?.orderDetails?.length ?? 0);

  totalPriceCalculation = computed(() => {
    const currentCart = this.currentCart();
    if (!currentCart)
      return 0;

    return currentCart.orderDetails.reduce((prev, curr, index) => (curr.article.priceInEUR * curr.quantity) + prev, 0);
  });

  removeCart(): void {

  }

  orderCart(): void {
    
  }
}
