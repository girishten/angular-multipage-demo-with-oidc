import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Any exclusions? add below
    if (!req.url.includes('/')) {
      return next.handle(req);
    }

    // clone request and replace 'http://' with 'https://' at the same time
    const httpsReq = req.clone({
      url: req.url.replace('http://', 'https://'),
    });

    return next.handle(httpsReq);
  }
}
