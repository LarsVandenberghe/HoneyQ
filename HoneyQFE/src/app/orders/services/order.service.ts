import { HttpClient } from "@angular/common/http";
import { effect, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, tap } from "rxjs";
import { IArticle } from "../../articles/services/article.service";
import { AuthService } from "../../core/services/auth.service";

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    #httpClient = inject(HttpClient);
    #url = `${environment.api}/`;

    getMyOrders(): Observable<IOrder[]> {
        return this.#httpClient.get<IOrder[]>(this.#url + "order/my-orders");
    }
}

@Injectable({
    providedIn: 'root',
})
export class EnhancedOrderService {
    #orderService = inject(OrderService);
    #authService = inject(AuthService);

    authEffectRef = effect(() => {
        const tokenValid = this.#authService.validToken();
        if (tokenValid) {
            this.#orderService.getMyOrders().pipe(tap(all => {
                this.myOrders.set(all);
                this.authEffectRef.destroy();
            })).subscribe();
        }
    })

    myOrders: WritableSignal<null | IOrder[]> = signal(null);

    refreshMyOrders(): void {
        this.#orderService.getMyOrders().subscribe(all => this.myOrders.set(all));
    }
}

export interface IOrder {
    id: string;
    orderDetails: IOrderDetail[];
    status: OrderStatus;
    sentDate: string | undefined;
    description: string | undefined;
}

export enum OrderStatus {
    CART = "CART",
    SENT = "SENT",
    PAID = "PAID",
    RECEIVED = "RECEIVED",
    PAID_AND_RECEIVED = "PAID_AND_RECEIVED",
    CANCELLED = "CANCELLED"
}

export interface IOrderDetail {
    id: string,
    article: IArticle,
    quantity: number
}