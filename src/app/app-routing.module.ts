import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHomeComponent } from './core/public-home/public-home.component';
import { PrivateHomeComponent } from './core/private-home/private-home.component';
import { PUBLIC_ROUTES } from './core/public.routes';
import { PRIVATE_ROUTES } from './core/private.routes';
import { ERROR_ROUTES } from './core/config/error.route.conf';
import { ROUTING_OPTIONS } from './core/config/routing.conf';
import { AUTH_ROUTES } from './core/config/auth.route.conf';
import { LoginComponent } from './core/public-home/login/login.component';
import { LogoutComponent } from './core/public-home/logout/logout.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PublicHomeComponent,
        data: { title: 'Public Page Layout' },
        children: PUBLIC_ROUTES,
      },
      {
        path: '',
        canActivate: [AuthGuard],
        component: PrivateHomeComponent,
        data: { title: 'Private Page Layout' },
        children: PRIVATE_ROUTES,
      },
    ],
  },
  { path: AUTH_ROUTES.login, component: LoginComponent },
  { path: AUTH_ROUTES.logout, component: LogoutComponent },
  { path: '**', redirectTo: `/${ERROR_ROUTES.p404}`, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, ROUTING_OPTIONS)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
