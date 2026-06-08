import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { EnhancedOrderService, IOrder, OrderStatus } from '../services/order.service';

@Component({
  selector: 'app-order-overview',
  imports: [DatePipe, CurrencyPipe, FontAwesomeModule],
  templateUrl: './order-overview.component.html',
  styleUrl: './order-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleOverviewComponent {
  #orderService = inject(EnhancedOrderService);

  myOrders = computed(() => {
    const orders = this.#orderService.myOrders();
    return orders?.filter(o => o.status !== OrderStatus.CART).sort((a, b) => {
      const dateA = a.sentDate ? new Date(a.sentDate).valueOf() : 0;
      const dateB = b.sentDate ? new Date(b.sentDate).valueOf() : 0;
      return dateB - dateA;
    });
  });

  faRefresh = faRefresh;

  refresh(): void {
    this.#orderService.refreshMyOrders();
  }

  orderTotal(order: IOrder): number {
    return order.orderDetails.reduce((sum, d) => sum + d.article.priceInEUR * d.quantity, 0);
  }

  statusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.CART]: 'Winkelwagen',
      [OrderStatus.SENT]: 'Verstuurd',
      [OrderStatus.PAID]: 'Betaald',
      [OrderStatus.RECEIVED]: 'Ontvangen',
      [OrderStatus.PAID_AND_RECEIVED]: 'Betaald & Ontvangen',
      [OrderStatus.CANCELLED]: 'Geannuleerd',
    };
    return labels[status] ?? status;
  }

  statusBadgeClass(status: OrderStatus): string {
    const classes: Record<OrderStatus, string> = {
      [OrderStatus.CART]: 'bg-secondary',
      [OrderStatus.SENT]: 'bg-info text-dark',
      [OrderStatus.PAID]: 'bg-primary',
      [OrderStatus.RECEIVED]: 'bg-success',
      [OrderStatus.PAID_AND_RECEIVED]: 'bg-success',
      [OrderStatus.CANCELLED]: 'bg-danger',
    };
    return classes[status] ?? 'bg-secondary';
  }
}
