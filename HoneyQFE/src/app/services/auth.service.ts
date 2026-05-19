import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../app.config';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private oAuthService = inject(OAuthService);
    profile = signal<any>(null);

    constructor() {
        this.initConfiguration();
    }

    initConfiguration() {
        this.oAuthService.configure(authConfig);
        this.oAuthService.setupAutomaticSilentRefresh();
        this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {

            if (this.oAuthService.hasValidIdToken()) {
                this.profile.set(this.oAuthService.getIdentityClaims());
            }
        });
    }

    login() {
        this.oAuthService.initImplicitFlow();
    }

    logout() {
        this.oAuthService.revokeTokenAndLogout();
        this.oAuthService.logOut();
        this.profile.set(null);
    }
}