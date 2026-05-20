import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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
  profile = input<any>();

  profileName = computed(() => {
    let profile = this.profile();
    if (!profile || !profile?.email){
      return "Unknown Account"
    }
    let name = `${profile.given_name ?? ''} ${profile.family_name ?? ''}`.trim();

    if (name === ""){
      name = profile?.email
    }
    return name;
  })

  faArrowRightFromBracket = faArrowRightFromBracket
  faUser = faUser
  faBasketShopping = faBasketShopping

  logout(): void {
    this.onLogout.emit();
  }
}
