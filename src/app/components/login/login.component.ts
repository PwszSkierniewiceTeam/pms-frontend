import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  constructor() {
  }

  ngOnInit() {
  }

  submit() {
    alert('You’re using: ' + this.credentials.email + ' with password: ' + this.credentials.password);
  }
}
