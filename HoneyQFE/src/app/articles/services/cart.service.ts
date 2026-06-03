import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { IArticle } from "./article.service";

@Injectable({
    providedIn: 'root',
})
class CartService {
    #httpClient = inject(HttpClient);
    #url = "http://localhost:8080/";

    findByUser(): Observable<IOrder[]> {
        return this.#httpClient.get<IOrder[]>(this.#url + "cart");
    }

    addOrUpdateItem(id: number, amount: number): Observable<IOrder> {
        return this.#httpClient.post<IOrder>(this.#url + `cart/add-or-update-item/${id}/${amount}`, undefined);
    }
}

@Injectable({
    providedIn: 'root',
})
export class EnhancedCartService {
    #cartService = inject(CartService);

    currentOrders: WritableSignal<null | IOrder[]> = signal(null);
    currentCart = computed(() => {
        const cartOrders = this.currentOrders();
        if (cartOrders?.length === 1) {
            return {...cartOrders[0]};
        }
        return undefined;
    })

    constructor() {
        this.#cartService.findByUser().subscribe(orders => this.currentOrders.set(orders.filter(o => o.status === OrderStatus.CART)));
    }

     addOrUpdateItem(id: number, amount: number): Observable<IOrder> {
        return this.#cartService.addOrUpdateItem(id, amount).pipe(
            tap(cart => {
                this.currentOrders.update(orders => {
                    if (orders) {
                        const index = orders.findIndex(o => o.id === cart.id);
                        orders[index] = cart;
                        return [...orders];
                    }
                    return orders;
                })
            })
        );
     }
}

export interface IOrder {
    id: string;
    orderDetails: IOrderDetail[];
    status: OrderStatus;
}

export enum OrderStatus {
    CART = "CART",
    SENT = "SENT",
    PAID = "PAID"
}

export interface IOrderDetail {
    id: string,
    article: IArticle,
    quantity: number
}