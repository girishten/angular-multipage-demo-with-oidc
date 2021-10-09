import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     *  This can be utilised if your app is ok to be locally cached.
     *  Also when req header is having no-cache you can ignore local cache
     *  same can be used for serverside as well.
     */

    // Any exclude or include Url from here
    // if (req.url.includes('realtime-data-url')) {
    //   return next.handle(req);
    // }

    // Another use case is when req header is having no-cache

    if (req.method !== 'GET') {
      // since CURD is happening to same url anything other than GET means data change
      // therefore cache should be deleted so that new data can be be fetched automatically.
      this.cache.delete(req.url);
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event);
        }
      })
    );
  }
}
