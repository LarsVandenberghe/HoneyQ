import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { EnhancedPeningOrderService as EnhancedPendingOrderService} from '../services/pending-order.service';
import { IAdminOrder, IUser } from '../services/pending-order.service';
import { OrderStatus } from '../../../my-orders/services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateStatusComponent } from '../dialogs/update-status/update-status.component';

@Component({
  selector: 'app-pending-order-overview',
  imports: [DatePipe, CurrencyPipe, FontAwesomeModule],
  templateUrl: './pending-order-overview.component.html',
  styleUrl: './pending-order-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingOrderOverviewComponent implements OnInit {
  #orderService = inject(EnhancedPendingOrderService);
  #modalService = inject(NgbModal);

  pendinghOrders = computed(() => {
    const orders = this.#orderService.pendingOrders();
    return orders?.sort((a, b) => {
      const dateA = a.sentDate ? new Date(a.sentDate).valueOf() : 0;
      const dateB = b.sentDate ? new Date(b.sentDate).valueOf() : 0;
      return dateB - dateA;
    });
  });

  faRefresh = faRefresh;
  faEdit = faEdit;

  ngOnInit(): void {
    this.#orderService.refreshPendingOrders();
  }

  refresh(): void {
    this.#orderService.refreshPendingOrders();
  }

  orderTotal(order: IAdminOrder): number {
    return order.orderDetails.reduce((sum, d) => sum + (d.articlePriceAfterOrdering ?? d.article.priceInEUR) * d.quantity, 0);
  }

  userName(user: IUser): string {
    return `${user.firstName} ${user.lastName}`;
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

  openUpdateStatusDialog(order: IAdminOrder): void {
    const modalRef = this.#modalService.open(UpdateStatusComponent, { centered: true });
    modalRef.componentInstance.currentStatus.set(order.status);
    modalRef.componentInstance.selectedStatus.set(order.status);
    modalRef.componentInstance.userName.set(this.userName(order.user));

    modalRef.result.then(
      (newStatus: OrderStatus) => {
        this.#orderService.updateOrderStatus(order.id, newStatus).subscribe(() => {
          this.#orderService.refreshPendingOrders();
        });
      },
      () => {}, // dismissed
    );
  }
}
