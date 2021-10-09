import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

// import {paths} from '../const';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     *  Handy when when you have locale support from serverside.
     *  headers like 'Accept-Language' with value 'en-US' or 'de' can be set here
     */
    // if (!req.url.includes(paths.header)) { // path for header redirect
    if (!req.url.includes('/')) {
      return next.handle(req);
    }
    console.warn('HeaderInterceptor');

    const modified = req.clone({ setHeaders: { 'X-Man': 'Wolverine' } });

    return next.handle(modified);
  }
}
