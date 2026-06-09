import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { OrderStatus } from '../../../my-orders/services/order.service';

@Component({
    imports: [NgbModule, FontAwesomeModule, FormsModule],
    templateUrl: './update-status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateStatusComponent {
    modal = inject(NgbActiveModal);

    currentStatus = signal<OrderStatus>(OrderStatus.SENT);
    selectedStatus = signal<OrderStatus>(OrderStatus.SENT);
    userName = signal<string>('');

    faCheck = faCheck;
    faClose = faClose;

    readonly statusOptions: { value: OrderStatus; label: string }[] = [
        { value: OrderStatus.CART, label: 'Winkelwagen' },
        { value: OrderStatus.SENT, label: 'Verstuurd' },
        { value: OrderStatus.PAID, label: 'Betaald' },
        { value: OrderStatus.RECEIVED, label: 'Ontvangen' },
        { value: OrderStatus.PAID_AND_RECEIVED, label: 'Betaald & Ontvangen' },
        { value: OrderStatus.CANCELLED, label: 'Geannuleerd' },
    ];

    currentStatusLabel = computed(() =>
        this.statusOptions.find(o => o.value === this.currentStatus())?.label ?? this.currentStatus()
    );

    onStatusChange(value: string): void {
        this.selectedStatus.set(value as OrderStatus);
    }
}
