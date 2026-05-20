import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-auth-redirect',
  templateUrl: 'auth-redirect.component.html',
  styleUrl: './auth-redirect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRedirectComponent{
  #authService = inject(AuthService);
  #router = inject(Router);

  // Give the authguard enough time to validate the articles path.
  #validToken = toSignal(toObservable(this.#authService.validToken).pipe(debounceTime(100)));

  #tokenEffect = effect(() => {
    if (this.#validToken()) {
      this.#router.navigate(["articles"]);
    }
  });
}
