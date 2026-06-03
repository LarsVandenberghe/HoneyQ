import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../core/services/auth.service";
import { tap, timer } from "rxjs";

@Component({
    selector: 'app-waiting-for-approval',
    imports: [NgbModule, FontAwesomeModule],
    templateUrl: './waiting-for-approval.component.html',
    styleUrl: './waiting-for-approval.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
}) export class WaitingForApprovalComponent {

    faHourglassHalf = faHourglassHalf
    #router = inject(Router);
    #authService = inject(AuthService);

    backToHomePage(): void {
        this.#authService.logout();
    }

    proceedToArticles(): void {
        this.#authService.refreshToken();
        timer(2000).pipe(
            tap(() => this.#router.navigate(['articles']))
        ).subscribe();
    }
}