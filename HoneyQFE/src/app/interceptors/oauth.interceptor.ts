import { inject, Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


export function oauthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
        
    let url = req.url.toLowerCase();
    let authStorage = inject(OAuthStorage);
    console.log("help!");

    if (!checkUrl(url)) return next(req);
        let token = authStorage.getItem('access_token');
        let header = 'Bearer ' + token;
        let headers = req.headers
                            .set('Authorization', header);
        req = req.clone({ headers });
    
    
    return next(req);

}

    
function checkUrl(url: string): boolean {
    return url.startsWith("http://localhost:8080");
}
