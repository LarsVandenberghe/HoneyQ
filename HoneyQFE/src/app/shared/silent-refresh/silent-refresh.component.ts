import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-auth-redirect',
  templateUrl: 'silent-refresh.component.html',
  styleUrl: './silent-refresh.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SilentRefreshComponent{
}
