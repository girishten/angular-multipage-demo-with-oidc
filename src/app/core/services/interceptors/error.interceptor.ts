import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ERROR_ROUTES } from '../../config/error.route.conf';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Error Exclusions - some urls doesn't require retries
    if (req.url.toLowerCase().includes('/authorization') || req.url.toLowerCase().includes('/login/refresh')) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          // 401 handled in auth.interceptor
          switch (error.status) {
            case 500:
              this.router.navigate([`/${ERROR_ROUTES.e500}`]).then(() => {});
              break;
            default:
              // do something
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
