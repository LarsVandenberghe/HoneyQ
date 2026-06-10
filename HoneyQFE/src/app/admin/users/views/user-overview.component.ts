import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRefresh, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService, IUserWithValidCheck } from '../../services/admin.service';
import { ValidateUserComponent } from '../dialogs/validate-user/validate-user.component';
import { sortStringProperty } from '../../../core/helpers/array';

@Component({
  selector: 'app-user-overview',
  imports: [FontAwesomeModule],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOverviewComponent implements OnInit {
  #adminService = inject(AdminService);
  #modalService = inject(NgbModal);

  users: WritableSignal<IUserWithValidCheck[] | null> = signal(null);

  faRefresh = faRefresh;
  faUserCheck = faUserCheck;

  ngOnInit(): void {
    this.loadUsers();
  }

  refresh(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.#adminService.getAllUsersWithRoleCheck().subscribe(users => this.users.set(
      users.sort((a, b) => sortStringProperty('validUser')({validUser: a.validUser.toString()}, {validUser: b.validUser.toString()}))
    ));
  }

  openValidateDialog(user: IUserWithValidCheck): void {
    const modalRef = this.#modalService.open(ValidateUserComponent, { centered: true });
    modalRef.componentInstance.userName.set(`${user.firstName} ${user.lastName}`);
    modalRef.componentInstance.userEmail.set(user.emailAddress);

    modalRef.result.then(
      () => {
        this.#adminService.validateUser(user.id).subscribe(() => this.loadUsers());
      },
      () => {},
    );
  }
}
