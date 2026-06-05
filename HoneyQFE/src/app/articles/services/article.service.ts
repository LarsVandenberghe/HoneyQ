import { HttpClient } from "@angular/common/http";
import { effect, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthService } from "../../core/services/auth.service";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    #httpClient = inject(HttpClient);
    #url = `${environment.api}/`;

    getAll(): Observable<IArticle[]> {
        return this.#httpClient.get<IArticle[]>(this.#url + "article");
    }
}

@Injectable({
    providedIn: 'root',
})
export class EnhancedArticleService {
    #articleService = inject(ArticleService);
    #authService = inject(AuthService);

    authEffectRef = effect(() => {
        const tokenValid = this.#authService.validToken();
        if (tokenValid) {
            this.#articleService.getAll().pipe(tap(all => {
                this.articles.set(all);
                this.authEffectRef.destroy();
            })).subscribe();
        }
    })

    articles: WritableSignal<null | IArticle[]> = signal(null);

    refreshArticles(): void {
        this.#articleService.getAll().subscribe(all => this.articles.set(all));
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