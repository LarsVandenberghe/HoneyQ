import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"
import { BehaviorSubject, filter, Observable, ReplaySubject } from "rxjs"

@Injectable({
    providedIn: 'root',
})
export class UserPrivilegeService {
    httpClient = inject(HttpClient);
    #cache$ = new BehaviorSubject<boolean | null>(null);

    getHasValidatedUserRole(): Observable<boolean> {
        if (this.#cache$.value === null){
           this.httpClient.get<boolean>("http://localhost:8080/user-privilege/has-validated_user-role").subscribe(result => this.#cache$.next(result));
        }

        return this.#cache$.asObservable().pipe(filter(data => data !== null))
    }

    clearCache(): void {
        this.#cache$.next(null);
    }
}