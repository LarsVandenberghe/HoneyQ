import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject, Injectable } from "@angular/core";
import { combineLatestWith, debounceTime, filter, map, of, race, shareReplay, timer } from "rxjs";
import { OAuthStorage } from "angular-oauth2-oidc";
import { parseJwtRoles } from "../helpers/jwt";


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    #authService = inject(AuthService);
    #router = inject(Router);
    #validToken$ = this.#authService.validToken$.pipe(shareReplay(1));

    // This function will wait 5 seconds for a valid token. If not token is available in these 5s the gaurd wil redirect to the home page.
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const timer5sTimout = timer(1000).pipe(map(() => this.#router.createUrlTree(['home'])));
        const tokenValid = this.#validToken$.pipe(filter(valid => valid));

        return race(timer5sTimout, tokenValid);
    }
}

@Injectable({
    providedIn: 'root',
})
export class UserPrivilegeGuard implements CanActivate {
    #authService = inject(AuthService);
    #oAuthStorage = inject(OAuthStorage);
    #router = inject(Router);
    #validToken$ = this.#authService.validToken$.pipe(shareReplay(1));


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const timer5sTimout = timer(1000).pipe(map(() => this.#router.createUrlTree(['home'])));
        const tokenValid = this.#validToken$.pipe(
            combineLatestWith(of(this.#getRolesFromAuthStore())),
            filter(([valid, _]) => valid),
            map(([_, roles]) => roles?.includes('validated_user') ? true : this.#declineAndRouteToPath(this.#router, 'waiting-for-approval'))
        );

        return race(timer5sTimout, tokenValid); 
    }

    #getRolesFromAuthStore(): string[] {
        const token = this.#oAuthStorage.getItem('access_token');
        if(!token) return [];
        return parseJwtRoles(token);
    }

    #declineAndRouteToPath(router: Router, path: string): boolean {
        router.navigate([path]);
        return false;
    }
}