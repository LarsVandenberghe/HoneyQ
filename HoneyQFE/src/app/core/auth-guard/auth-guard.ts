import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, race, timer } from "rxjs";


// This function will wait 5 seconds for a valid token. If not token is available in these 5s the gaurd wil redirect to the home page.
export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const timer5sTimout = timer(5000).pipe(map(() => router.createUrlTree(['home'])));
    const tokenValid = toObservable(authService.validToken).pipe(filter(valid => valid));

    return race(timer5sTimout, tokenValid);
};