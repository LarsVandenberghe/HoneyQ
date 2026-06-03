import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, EMPTY, Observable, tap, throwError } from "rxjs";
import { ToastService } from "../services/toast.service";

export function errorInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const toastService = inject(ToastService);

    return next(req).pipe(
        catchError(err => {
            if (err.status === 400){
                toastService.showDanger(err.error.message ?? "Er ging iets mis.");
                return EMPTY;
            } else if (err.status === 500) {
                toastService.showDanger("Er ging iets mis.");
                return EMPTY;
            }
            return throwError(() => err);
        })

    );

}