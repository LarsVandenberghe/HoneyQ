import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { faArrowRightFromBracket, faBasketShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  imports: [NgbModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  onLogout = output<void>();
  faArrowRightFromBracket = faArrowRightFromBracket
  faUser = faUser
  faBasketShopping = faBasketShopping

  logout(): void {
    this.onLogout.emit();
  }
}
