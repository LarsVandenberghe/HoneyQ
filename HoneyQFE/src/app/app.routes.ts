import { Routes } from '@angular/router';
import { AuthRedirectComponent } from './shared/auth-redirect/auth-redirect.component';
import { ArticleOverviewComponent } from './articles/views/article-overview.component/article-overview.component';
import { authGuard } from './core/auth-guard/auth-guard';

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
    path: 'articles',
    component: ArticleOverviewComponent,
    canMatch: [authGuard],
  },
  {
    path: 'auth-redirect', // this is needed because the root redirects to home and the auth parameters are gone.
    component: AuthRedirectComponent
  }
];
