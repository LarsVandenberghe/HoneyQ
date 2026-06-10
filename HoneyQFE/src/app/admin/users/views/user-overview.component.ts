import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-overview',
  imports: [FontAwesomeModule],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOverviewComponent implements OnInit {
  #adminService = inject(AdminService);

  ngOnInit(): void {
    this.#adminService.getAllUsersWithRoleCheck().subscribe();
  }

}
