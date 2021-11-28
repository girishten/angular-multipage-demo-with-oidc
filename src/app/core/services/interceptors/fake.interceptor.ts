import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class FakeInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // faking for development purpose
    // if (!req.url.includes(paths.fake)) { // path for error redirect
    if (!req.url.includes('/')) {
      return next.handle(req);
    }
    console.warn('FakeInterceptor');

    const resp = { firstName: 'Mock', lastName: 'Faker' };
    return of(new HttpResponse({ status: 200, body: resp }));
  }
}
