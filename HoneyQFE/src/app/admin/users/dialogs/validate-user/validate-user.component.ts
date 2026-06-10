import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
    imports: [NgbModule, FontAwesomeModule],
    templateUrl: './validate-user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateUserComponent {
    modal = inject(NgbActiveModal);

    userName = signal<string>('');
    userEmail = signal<string>('');

    faCheck = faCheck;
    faClose = faClose;
}
