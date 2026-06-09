import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { EnhancedPeningOrderService as EnhancedPendingOrderService} from '../services/pending-order.service';
import { IOrder, OrderStatus } from '../../my-orders/services/order.service';

@Component({
  selector: 'app-pending-order-overview',
  imports: [DatePipe, CurrencyPipe, FontAwesomeModule],
  templateUrl: './pending-order-overview.component.html',
  styleUrl: './pending-order-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingOrderOverviewComponent implements OnInit {
  #orderService = inject(EnhancedPendingOrderService);

  pendinghOrders = computed(() => {
    const orders = this.#orderService.pendingOrders();
    return orders?.sort((a, b) => {
      const dateA = a.sentDate ? new Date(a.sentDate).valueOf() : 0;
      const dateB = b.sentDate ? new Date(b.sentDate).valueOf() : 0;
      return dateB - dateA;
    });
  });

  faRefresh = faRefresh;

  ngOnInit(): void {
    this.#orderService.refreshPendingOrders();
  }

  refresh(): void {
    this.#orderService.refreshPendingOrders();
  }

  orderTotal(order: IOrder): number {
    return order.orderDetails.reduce((sum, d) => sum + (d.articlePriceAfterOrdering ?? d.article.priceInEUR) * d.quantity, 0);
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
