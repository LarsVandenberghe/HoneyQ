import { Injectable, inject, signal } from '@angular/core';
import { OAuthErrorEvent, OAuthEvent, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { authConfig } from '../../app.config';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    profile = signal<any>(null);

    #validTokenSubject$ = new BehaviorSubject<boolean>(false);
    validToken = toSignal(this.#validTokenSubject$,{
        equal: () => false
    });
    validToken$ = this.#validTokenSubject$.asObservable();

    #oAuthService = inject(OAuthService);
    #oAuthStorage = inject(OAuthStorage);
    #router = inject(Router);

    constructor() {
        this.initConfiguration();
    }

    initConfiguration(): void {
        this.#oAuthService.configure(authConfig);
        this.#oAuthService.setupAutomaticSilentRefresh();

        this.#oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
            if (this.#oAuthService.hasValidIdToken()) {
                this.profile.set(this.#oAuthService.getIdentityClaims());
            }
        });

        this.#oAuthService.events.pipe(
            tap(event => this.#validateTokenOnEvent(event))
        ).subscribe();
    }

    login(): void {
        this.#oAuthService.initImplicitFlow();
    }

    logout(): void {
        this.#oAuthService.revokeTokenAndLogout();
        this.#oAuthService.logOut();
        this.profile.set(null);
        this.#router.navigateByUrl('home');
    }

    refreshToken(): void {
        this.#oAuthService.silentRefresh();
    }

    getCurrentRoles(): string[] {
        const token = this.#oAuthStorage.getItem('access_token');
        if(!token) return [];
        return this.#parseJwtRoles(token);
    }

    #validateTokenOnEvent(event: OAuthEvent): void {
        if (event instanceof OAuthErrorEvent) {
            console.error(event);
        }
        
        this.#validTokenSubject$.next(this.#oAuthService.hasValidAccessToken());
    }

    #parseJwtRoles(token: string): string[] {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload).realm_access?.roles ?? [] as string[];
    }
}