import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { EnhancedCartService, IOrderDetail } from '../../../articles/services/cart.service';
import { faDolly, faQuestion, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { DecimalPipe } from '@angular/common';
import { sortStringProperty } from '../../../core/helpers/array';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmOrderComponent } from '../dialogs/confirm-order/confirm-order.component';
import { EnhancedArticleService } from '../../../articles/services/article.service';

@Component({
  selector: 'app-cart-overview',
  imports: [FontAwesomeModule, CartItemComponent, DecimalPipe],
  templateUrl: './cart-overview.component.html',
  styleUrl: './cart-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartOverviewComponent {
  #cartService = inject(EnhancedCartService);
  #articleService = inject(EnhancedArticleService);
  #modalService = inject(NgbModal);
  onClose = output<string>();

  faTrashCan = faTrashCan
  faDolly = faDolly
  faQuestion = faQuestion

  currentCart = this.#cartService.currentCart;
  sortedOrderDetails = computed(() => {
    const currentCart = this.currentCart();
    return currentCart?.orderDetails.sort((a, b) => sortStringProperty("name")(a.article, b.article));
  });

  cartItemCount = computed(() => this.#cartService.currentCart()?.orderDetails?.length ?? 0);

  totalPriceCalculation = computed(() => {
    const currentCart = this.currentCart();
    if (!currentCart)
      return 0;

    return currentCart.orderDetails.reduce((prev, curr, index) => (curr.article.priceInEUR * curr.quantity) + prev, 0);
  });

  articleAmountUpdate(orderDetail: IOrderDetail, amount: number): void {
    this.#cartService.addOrUpdateItem(orderDetail.article.id, amount).subscribe();
  }

  removeCart(): void {
    const currentCart = this.currentCart();
    if (currentCart) {
      this.#cartService.removeItems(currentCart.id).subscribe();
    }
  }

  orderCart(): void {
    const currentCart = this.currentCart();
    const totalPrice = this.totalPriceCalculation();

    if (currentCart) {
      const modalRef = this.#modalService.open(ConfirmOrderComponent, { ariaLabelledBy: 'modal-basic-title', centered: true })
      modalRef.componentInstance.currentCart.set(currentCart);
      modalRef.componentInstance.totalPrice.set(totalPrice);

      modalRef.result.then(
          (result: boolean) => {
            if (result) { this.#cartService.makeOrderFromMyCart(currentCart.id).subscribe(() => {
              this.#articleService.refreshArticles();
              this.onClose.emit('Order Confirmed!');
            }); }
          },
          () => {}, // dismissed
      );
    }
  }
}
