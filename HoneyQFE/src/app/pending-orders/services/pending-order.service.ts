import { effect, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { tap } from "rxjs";
import { AuthService } from "../../core/services/auth.service";
import { AdminService } from "../../core/services/admin.service";
import { IOrder } from "../../my-orders/services/order.service";

@Injectable({
    providedIn: 'root',
})
export class EnhancedPeningOrderService {
    #orderService = inject(AdminService);

    // authEffectRef = effect(() => {
    //     const tokenValid = this.#authService.validToken();
    //     if (tokenValid) {
    //         this.#orderService.getPendingOrders().pipe(tap(all => {
    //             this.pendingOrders.set(all);
    //             this.authEffectRef.destroy();
    //         })).subscribe();
    //     }
    // })

    pendingOrders: WritableSignal<null | IOrder[]> = signal(null);

    refreshPendingOrders(): void {
        this.#orderService.getPendingOrders().subscribe(all => this.pendingOrders.set(all));
    }
}