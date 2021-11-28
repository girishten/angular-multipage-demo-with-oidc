import { Routes } from '@angular/router';
import { ERROR_ROUTES } from './config/error.route.conf';

import { P401Component } from './public-home/p401/p401.component';
import { P403Component } from './public-home/p403/p403.component';
import { P404Component } from './public-home/p404/p404.component';
import { E500Component } from './public-home/e500/e500.component';
import { homeRoute } from './config/app.conf';

export const PUBLIC_ROUTES: Routes = [
  { path: '', redirectTo: `/${homeRoute}`, pathMatch: 'full' },
  { path: ERROR_ROUTES.p401, component: P401Component },
  { path: ERROR_ROUTES.p403, component: P403Component },
  { path: ERROR_ROUTES.p404, component: P404Component },
  { path: ERROR_ROUTES.e500, component: E500Component },
];
