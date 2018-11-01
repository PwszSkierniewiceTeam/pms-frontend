import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ApiError } from '../../classes/api-error.class';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'pms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  apiError: ApiError | null = null;
  credentials = {
    email: '',
    password: ''
  };
  hidePassword = true;

  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionService: SessionService
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.apiError = null;

    this.sessionService.login(this.credentials).pipe(
      catchError(err => {
        this.apiError = ApiError.fromHttpErrorResponse(err);
        throw err;
      })
    ).subscribe(() => {
      this.router.navigate(['/', 'home']);
    });
  }
}
