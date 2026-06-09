import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { IOrder, OrderStatus } from "../../my-orders/services/order.service";

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    #httpClient = inject(HttpClient);
    #url = `${environment.api}/`;

    getPendingOrders(): Observable<IOrder[]> {
        return this.#httpClient.get<IOrder[]>(this.#url + "admin/pending-orders");
    }

    updateOrderStatus(id: string, status: OrderStatus) {
        return this.#httpClient.post<IOrder[]>(this.#url + `admin/update-order-status/${id}/status/${status}`, undefined);
    }

    validateUser(id: string) {
        return this.#httpClient.post<IOrder[]>(this.#url + `admin/validate-user/${id}`, undefined);
    }
}