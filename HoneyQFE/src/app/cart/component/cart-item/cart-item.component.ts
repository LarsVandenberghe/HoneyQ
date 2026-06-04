import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, OnInit } from '@angular/core';
import { IOrderDetail } from '../../../articles/services/cart.service';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  imports: [FontAwesomeModule, DecimalPipe, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit {
  faTrashCan = faTrashCan
  faPlus = faPlus
  faMinus = faMinus

  orderDetail = input.required<IOrderDetail>();

  amount = linkedSignal({
    source: () => {
      return this.orderDetail().quantity;
    },
    computation: (source) => source
  });

  availableStockLabel = computed(() => {
    const currentArticle = this.orderDetail().article;
    if (!currentArticle)
      return 0;
    return `${currentArticle.amountOfStock - currentArticle.reservedStock - this.amount()} / ${currentArticle.amountOfStock}`;
  });

  maximumStockAllowed = computed(() => {
    const currentArticle = this.orderDetail().article;
    if (!currentArticle)
      return 0;
    return currentArticle.amountOfStock - currentArticle.reservedStock;
  });


  ngOnInit(): void {
    this.onAmountChange(this.amount());
  }

  onAmountChange(amount: number): void {
    const maximumAllowed = this.maximumStockAllowed();
    if (amount > maximumAllowed) {
      this.amount.set(maximumAllowed);
    } else if (amount < 1) {
      this.amount.set(1);
    } else {
      this.amount.set(amount);
    }
  }
}
