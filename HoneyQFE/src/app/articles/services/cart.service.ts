import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal, TemplateRef, WritableSignal } from "@angular/core";
import { map, Observable, switchMap, tap } from "rxjs";
import { IArticle } from "./article.service";
import { NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../core/services/auth.service";

@Injectable({
    providedIn: 'root',
})
class CartService {
    #httpClient = inject(HttpClient);
    #url = "http://localhost:8080/";

    findByUser(): Observable<IOrder[]> {
        return this.#httpClient.get<IOrder[]>(this.#url + "cart");
    }

    addOrUpdateItem(articleId: number, amount: number): Observable<IOrder> {
        return this.#httpClient.post<IOrder>(this.#url + `cart/add-or-update-item/${articleId}/${amount}`, undefined);
    }

    removeItems(cartId: string): Observable<IOrder> {
        return this.#httpClient.post<IOrder>(this.#url + `cart/remove-items-from-cart/${cartId}`, undefined);
    }

    makeOrderFromMyCart(cartId: string): Observable<IOrder> {
        return this.#httpClient.post<IOrder>(this.#url + `cart/make-order-from-cart/${cartId}`, undefined);
    }
}

@Injectable({
    providedIn: 'root',
})
export class EnhancedCartService {
    #cartService = inject(CartService);
    #offcanvasService = inject(NgbOffcanvas);
    #cartOffCanvasTemplate: TemplateRef<any> | null = null;
    #authService = inject(AuthService);

    currentOrders: WritableSignal<null | IOrder[]> = signal(null);
    currentCart = computed(() => {
        const cartOrders = this.currentOrders();
        if (cartOrders?.length === 1) {
            return { ...cartOrders[0] };
        }
        return undefined;
    })

    authEffectRef = effect(() => {
        const tokenValid = this.#authService.validToken();
        if (tokenValid) {
            this.#cartService.findByUser().pipe(
                tap(orders => {
                    this.currentOrders.set(orders.filter(o => o.status === OrderStatus.CART));
                    this.authEffectRef.destroy();
                })
            ).subscribe();
        }
    })

    addOrUpdateItem(articleId: number, amount: number): Observable<IOrder> {
        return this.#cartService.addOrUpdateItem(articleId, amount).pipe(
            tap((cart) => this.#updateCartPostCall(cart))
        );
    }

    removeItems(cartId: string): Observable<IOrder> {
        return this.#cartService.removeItems(cartId).pipe(
            tap((cart) => this.#updateCartPostCall(cart))
        );
    }

    makeOrderFromMyCart(cartId: string): Observable<void> {
        return this.#cartService.makeOrderFromMyCart(cartId).pipe(
            switchMap(() => this.#cartService.findByUser()),
            map(orders => this.currentOrders.set(orders.filter(o => o.status === OrderStatus.CART)))
        );
    }

    registerCartOffCanvasTemplate(template: TemplateRef<any>): void {
        this.#cartOffCanvasTemplate = template;
    }

    openCartOffCanvas(): void {
        if (this.#cartOffCanvasTemplate) {
            this.#offcanvasService.open(this.#cartOffCanvasTemplate, { position: 'end' });
        }
    }

    #updateCartPostCall(cart: IOrder): void {
        this.currentOrders.update(orders => {
            if (orders) {
                const index = orders.findIndex(o => o.id === cart.id);
                if (index === -1) {
                    orders.push(cart);
                } else {
                    orders[index] = cart;
                }

                return [...orders].sort();
            }
            return orders;
        })
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