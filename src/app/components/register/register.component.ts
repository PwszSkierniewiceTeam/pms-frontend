import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiError } from '../../classes/api-error.class';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'pms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  apiError: ApiError | null = null;
  hidePassword = true;
  user = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };

  constructor(private userDataService: UserDataService, private router: Router) {
  }

  submit(): void {
    this.registerUser().subscribe(() => {
      this.router.navigate(['/', 'login']);
    });
  }

  submitWithAlert(): void {
    this.registerUser().subscribe(() => {
      this.router.navigate(['/', 'login']);
      alert('New profile created. Use your credentials to sign in.');
    });
  }

  private registerUser(): Observable<any> {
    return this.userDataService.registerUser(this.user)
      .pipe(
        catchError(err => {
          this.apiError = ApiError.fromHttpErrorResponse(err);
          throw err;
        })
      );
  }
}
