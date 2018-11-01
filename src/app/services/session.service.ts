import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginCredentials } from '../interfaces/login-credentials.interface';
import { User } from '../models/user.model';
import { Utils } from '../utils';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  expires?: number = null;
  milliSecondsToRenewToken = 5 * 60 * 1000;
  token?: string = null;
  user?: User = null;

  constructor(private http: HttpClient, private lc: StorageService) {
    const token = this.lc.getItem('jwt');

    if (!!token) {
      this.decodeToken(token, parseInt(this.lc.getItem('jwt-expires'), 10));
    }
  }

  getLifeTimeLeft(): number {
    if (this.expires === null) {
      return 0;
    }

    const timeLeft = this.expires - (new Date()).getTime();
    return timeLeft > 0 ? timeLeft : 0;
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<{ jwt: string }>(`${environment.apiUrl}/users/login`, credentials).pipe(
      map(res => this.decodeToken(res.jwt))
    );
  }

  logout(): void {
    this.expires = null;
    this.token = null;
    this.user = null;
    this.lc.clear();
  }

  /**
   * Decodes token data payload
   *
   * @returns {any} token payload
   */
  private decodeToken(token: string, expires?: number): User {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    const decoded = Utils.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    const tokenData = JSON.parse(decoded);
    this.token = token;
    this.user = new User(tokenData.user);
    this.expires = expires || (new Date()).getTime() + tokenData.validFor * 1000;
    this.lc.setItem('jwt', this.token);
    this.lc.setItem('jwt-expires', this.expires.toString());

    return new User(tokenData.user);
  }
}
