import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private http: HttpClient) {
  }

  registerUser(user: Partial<User>): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }
}
