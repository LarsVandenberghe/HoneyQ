import { Routes } from '@angular/router';
import { AuthRedirectComponent } from './shared/auth-redirect/auth-redirect.component';
import { ArticleOverviewComponent } from './articles/views/article-overview/article-overview.component';
import { AdminGuard, AuthGuard, UserPrivilegeGuard } from './core/auth-guard/auth-guard';
import { WaitingForApprovalComponent } from './waiting-for-approval/waiting-for-approval.component';
import { SilentRefreshComponent } from './shared/silent-refresh/silent-refresh.component';
import { MyOrderOverviewComponent } from './my-orders/views/my-order-overview.component';
import { PendingOrderOverviewComponent } from './pending-orders/views/pending-order-overview.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',

  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then(r => r.routes),
  },
  {
    path: 'auth-redirect', // this is needed because the root redirects to home and the auth parameters are gone.
    component: AuthRedirectComponent
  },
  {
    path: 'silent-refresh', // this is needed when the token has to be refreshed in the background.
    component: SilentRefreshComponent
  },
  {
    path: 'waiting-for-approval', // this is needed because the root redirects to home and the auth parameters are gone.
    component: WaitingForApprovalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'articles',
    component: ArticleOverviewComponent,
    canActivate: [UserPrivilegeGuard],
  },
  {
    path: 'my-orders',
    component: MyOrderOverviewComponent,
    canActivate: [UserPrivilegeGuard],
  },
  {
    path: 'pending-orders',
    component: PendingOrderOverviewComponent,
    canActivate: [AdminGuard],
  }
];
