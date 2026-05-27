import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    httpClient = inject(HttpClient)

    getAll(): Observable<any> {
        return this.httpClient.get<any[]>("http://localhost:8080/cart")
    }
}

export interface ICart {
    // TODO
}