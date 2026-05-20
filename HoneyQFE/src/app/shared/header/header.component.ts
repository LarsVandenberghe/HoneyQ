import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  onLogout = output<void>();

  logout(): void {
    this.onLogout.emit();
  }
}
