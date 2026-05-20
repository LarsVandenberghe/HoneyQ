import { Injectable, inject, signal } from '@angular/core';
import { OAuthErrorEvent, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../app.config';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    #oAuthService = inject(OAuthService);
    #router = inject(Router)

    profile = signal<any>(null);
    validToken = signal<boolean>(false);

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

    #validateTokenOnEvent(event: OAuthEvent): void {
        if (event instanceof OAuthErrorEvent) {
            console.error(event);
        } else {
            console.warn(event);
        }
        
        this.validToken.set(this.#oAuthService.hasValidAccessToken());
    }
}