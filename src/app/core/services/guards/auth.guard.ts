import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AUTH_ROUTES } from '../../config/auth.route.conf';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    routeState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // todo: improvement! there should be a better way to detect page reload other than comparing present routes and requested route
    if (window.location.pathname + window.location.search === routeState.url) {
      // page reload at some inner location; go to login and try to redirect to there
      this.router.navigate(['/' + AUTH_ROUTES.login, { redirect: routeState.url }]).then(() => {});
      return this.isAuthenticated(routeState.url);
    } else {
      return this.isAuthenticated(routeState.url);
    }
  }

  isAuthenticated(url: string): Observable<boolean> {
    return this.authService.isDoneLoading$.pipe(
      filter((isDone) => isDone),
      switchMap((_) => this.authService.isAuthenticated$),
      tap((isAuthenticated) => isAuthenticated || this.authService.login(url))
    );
  }
}
