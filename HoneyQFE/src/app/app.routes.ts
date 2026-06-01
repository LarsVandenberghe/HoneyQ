import { Routes } from '@angular/router';
import { AuthRedirectComponent } from './shared/auth-redirect/auth-redirect.component';
import { ArticleOverviewComponent } from './articles/views/article-overview.component/article-overview.component';
import { authGuard, userPrivilegeGuard } from './core/auth-guard/auth-guard';
import { WaitingForApprovalComponent } from './waiting-for-approval/waiting-for-approval.component';

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
    path: 'waiting-for-approval', // this is needed because the root redirects to home and the auth parameters are gone.
    component: WaitingForApprovalComponent,
    canMatch: [authGuard],
  },
  {
    path: 'articles',
    component: ArticleOverviewComponent,
    canMatch: [userPrivilegeGuard],
  },
];
