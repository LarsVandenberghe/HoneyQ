import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';
import { oauthInterceptor } from './core/interceptors/oauth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([oauthInterceptor, errorInterceptor])),
    provideOAuthClient(),
    { provide: LOCALE_ID, useValue: 'nl' }
  ]
};

export const authConfig: AuthConfig = {
  issuer: environment.authServer,
  redirectUri: `${window.location.origin}/auth-redirect`,
  silentRefreshRedirectUri: `${window.location.origin}/silent-refresh`,
  postLogoutRedirectUri: window.location.origin,
  clientId: '347163991079-45e95m99907r6hqvtj182nad4uismkdb',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
};