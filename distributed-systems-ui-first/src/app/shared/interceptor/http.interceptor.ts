import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StorageService } from '../services/storage.service';

/**
 * HTTP Interceptor
 * 
 * Details about Angular HTTP Interceptor:
 * https://scotch.io/@vigneshsithirai/angular-6-7-http-client-interceptor-with-error-handling
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private router: Router) {}

  /**
   * Intercept each request and attach the Basic Authorization Code.
   * It will redirect the user to /login if it catch some error response.
   * @return {Observable}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /** Getting the user token from the browser localStoarge */
    const authCode: string = this.storageService.get(this.storageService.app_token);

    let authReq = req.clone();
    authReq = req.clone({
      setHeaders: { Authorization: `Basic ${authCode}` }
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403 || !error.status) {
            this.storageService.remove(this.storageService.app_token);
            this.router.navigate(['/login'], {
              queryParams: {
                unauthorized: true
              }
            });
            return empty();
          } else {
            return throwError(error);
          }
        }
      })
    );
  }
}
