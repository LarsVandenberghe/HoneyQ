import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { Observable } from "rxjs";
import { AdminService } from "../../core/services/admin.service";
import { IOrderDetail, OrderStatus } from "../../my-orders/services/order.service";

@Injectable({
    providedIn: 'root',
})
export class EnhancedPeningOrderService {
    #orderService = inject(AdminService);
    pendingOrders: WritableSignal<null | IAdminOrder[]> = signal(null);

    refreshPendingOrders(): void {
        this.#orderService.getPendingOrders().subscribe(all => this.pendingOrders.set(all));
    }

    updateOrderStatus(id: string, status: OrderStatus): Observable<void> {
        return this.#orderService.updateOrderStatus(id, status);
    }
}

export interface IAdminOrder {
    id: string;
    orderDetails: IOrderDetail[];
    status: OrderStatus;
    sentDate: string | undefined;
    description: string | undefined;
    user: IUser;
}

export interface IUser {
    emailAddress: string;
    id: string;
    firstName: string;
    lastName: string;
}
