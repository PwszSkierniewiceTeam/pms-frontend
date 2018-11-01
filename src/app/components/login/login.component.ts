import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'pms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  apiError: object | null;
  credentials = {
    email: '',
    password: ''
  };
  form: FormGroup;
  hidePassword = true;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    alert('You’re using: ' + this.credentials.email + ' with password: ' + this.credentials.password);
  }
}
