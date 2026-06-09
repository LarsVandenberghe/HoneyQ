import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { OrderStatus } from "../../my-orders/services/order.service";
import { IAdminOrder } from "../../pending-orders/services/pending-order.service";

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    #httpClient = inject(HttpClient);
    #url = `${environment.api}/`;

    getPendingOrders(): Observable<IAdminOrder[]> {
        return this.#httpClient.get<IAdminOrder[]>(this.#url + "admin/pending-orders");
    }

    updateOrderStatus(id: string, status: OrderStatus) {
        return this.#httpClient.post<void>(this.#url + `admin/update-order-status/${id}/status/${status}`, undefined);
    }

    validateUser(id: string) {
        return this.#httpClient.post<void>(this.#url + `admin/validate-user/${id}`, undefined);
    }
}