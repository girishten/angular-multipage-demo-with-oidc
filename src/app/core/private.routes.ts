import { Routes } from '@angular/router';
import { homeRoute } from './config/app.config';
import { AUTH_ROUTES } from './config/auth.route.conf';

import { DashboardComponent } from './private-home/dashboard/dashboard.component';

export const PRIVATE_ROUTES: Routes = [
  { path: '', redirectTo: `/${AUTH_ROUTES.login}`, pathMatch: 'full' },
  { path: homeRoute, component: DashboardComponent },
  {
    path: 'feature',
    loadChildren: () => import('../features/feature-module-demo/feature-module-demo.module').then((m) => m.FeatureModuleDemoModule),
  }
];
