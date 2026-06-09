import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject, Injectable } from "@angular/core";
import { combineLatestWith, filter, map, of, race, shareReplay, timer } from "rxjs";
import { OAuthStorage } from "angular-oauth2-oidc";
// import { getRolesFromAuthStore } from "../helpers/jwt";

const TIMEOUT_TIME_MS = 1000
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    #authService = inject(AuthService);
    #router = inject(Router);
    #validToken$ = this.#authService.validToken$.pipe(shareReplay(1));

    // This function will wait 5 seconds for a valid token. If not token is available in these 5s the gaurd wil redirect to the home page.
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const timer5sTimout = timer(TIMEOUT_TIME_MS).pipe(map(() => this.#router.createUrlTree(['home'])));
        const tokenValid = this.#validToken$.pipe(filter(valid => valid));

        return race(timer5sTimout, tokenValid);
    }
}

@Injectable({
    providedIn: 'root',
})
export class UserPrivilegeGuard implements CanActivate {
    #authService = inject(AuthService);
    #router = inject(Router);
    #validToken$ = this.#authService.validToken$.pipe(shareReplay(1));


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const timer5sTimout = timer(TIMEOUT_TIME_MS).pipe(map(() => this.#router.createUrlTree(['home'])));
        const tokenValid = this.#validToken$.pipe(
            combineLatestWith(of(this.#authService.getCurrentRoles())),
            filter(([valid, _]) => valid),
            map(([_, roles]) => roles?.includes('validated_user') ? true : this.#declineAndRouteToPath(this.#router, 'waiting-for-approval'))
        );

        return race(timer5sTimout, tokenValid); 
    }

    #declineAndRouteToPath(router: Router, path: string): boolean {
        router.navigate([path]);
        return false;
    }
}

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    #authService = inject(AuthService);
    #router = inject(Router);
    #validToken$ = this.#authService.validToken$.pipe(shareReplay(1));


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const timer5sTimout = timer(TIMEOUT_TIME_MS).pipe(map(() => this.#router.createUrlTree(['home'])));
        const tokenValid = this.#validToken$.pipe(
            combineLatestWith(of(this.#authService.getCurrentRoles())),
            filter(([valid, _]) => valid),
            map(([_, roles]) => roles?.includes('honeyq_admin') ? true : false)
        );

        return race(timer5sTimout, tokenValid); 
    }
}