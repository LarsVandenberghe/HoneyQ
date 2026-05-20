import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    httpClient = inject(HttpClient)

    getAll(): Observable<any> {
        return this.httpClient.get("http://localhost:8080/article")
    }
}