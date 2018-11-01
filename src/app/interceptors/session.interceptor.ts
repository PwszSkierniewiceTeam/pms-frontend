import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginCredentials } from '../interfaces/login-credentials.interface';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class SessionInterceptor implements HttpInterceptor {
  private renewTokenRequestNotInProgress = true;

  constructor(private sessionService: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionService.token;
    if (!token) {
      return next.handle(req);
    }

    return next.handle(this.addToken(req, token ? token : '')).pipe(
      map((event: HttpEvent<any>) => {
        if (
          event instanceof HttpResponse &&
          this.renewTokenRequestNotInProgress &&
          this.shouldRenewToken()
        ) {
          this.renewTokenRequestNotInProgress = false;

          const credentials: LoginCredentials = {
            email: this.sessionService.user.email,
            password: this.sessionService.user.password
          };

          this.sessionService
            .login(credentials)
            .subscribe(
              () => (this.renewTokenRequestNotInProgress = true),
              err => this.handleError<HttpEvent<any>>(err)
            );
        }

        return event;
      }),
      catchError(err => this.handleError<HttpEvent<any>>(err))
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({setHeaders: {Authorization: 'Bearer ' + token}});
  }

  private handleError<T>(error: any): Observable<T> {
    this.renewTokenRequestNotInProgress = true;
    return throwError(error);
  }

  private shouldRenewToken(): boolean {
    const timeLeft = this.sessionService.getLifeTimeLeft();
    return (
      timeLeft > 0 &&
      timeLeft <= this.sessionService.milliSecondsToRenewToken &&
      this.renewTokenRequestNotInProgress
    );
  }
}
