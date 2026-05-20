import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-redirect',
  imports: [],
  templateUrl: 'auth-redirect.component.html',
  styleUrl: './auth-redirect.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRedirectComponent{
  #authService = inject(AuthService);
  #router = inject(Router);

  #tokenEffect = effect(() => {
    if (this.#authService.validToken()) {
      this.#router.navigate(["articles"]);
    }
  });
}
