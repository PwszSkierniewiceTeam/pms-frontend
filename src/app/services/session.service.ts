import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginCredentials } from '../interfaces/login-credentials.interface';
import { User } from '../models/user.model';
import { Utils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  expires: number | null = null;
  miliSecondsToRenewToken = 5 * 60 * 1000;
  token: string;
  user: User | null = null;

  constructor(private http: HttpClient) {
  }

  getLifeTimeLeft(): number {
    if (!this.expires) {
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

  /**
   * Decodes token data payload
   *
   * @returns {any} token payload
   */
  private decodeToken(token: string): User {
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
    this.user = tokenData.user;
    this.expires = tokenData.exp;

    return new User(tokenData.user);
  }
}
