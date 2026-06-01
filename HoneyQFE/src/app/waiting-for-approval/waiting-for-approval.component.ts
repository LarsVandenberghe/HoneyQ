import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserPrivilegeService } from "../core/services/user-privilege.service";
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
    router = inject(Router);
    userPrivilegeService = inject(UserPrivilegeService);
    authService = inject(AuthService);
    destroyRef = inject(DestroyRef);

    backToHomePage(): void {
        this.authService.logout();
    }

    backProceedToArticles(): void {
        this.userPrivilegeService.clearCache();
        this.authService.refreshToken();
        timer(1000).pipe(
            tap(() => this.router.navigate(['articles']))
        ).subscribe();
    }
}