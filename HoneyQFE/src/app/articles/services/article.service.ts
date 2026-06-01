import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    httpClient = inject(HttpClient)

    getAll(): Observable<IArticle[]> {
        return this.httpClient.get<IArticle[]>("http://localhost:8080/article")
    }
}

export interface IArticle {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    isBulk: boolean;
    reservedStock: number;
    amountOfStock: number;
    weightKg: number;
    priceInEUR: number;
}