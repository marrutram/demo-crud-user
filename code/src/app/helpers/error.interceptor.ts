import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService , AlertService} from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private alertService: AlertService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
          this.authenticationService.logout();
          location.reload(true);
      }
      const error = err.error.message || err.statusText;
      console.log('error::', err.error.reason);
      this.alertService.error(err.error.reason);
      return throwError(error);
    }))
  }
}
