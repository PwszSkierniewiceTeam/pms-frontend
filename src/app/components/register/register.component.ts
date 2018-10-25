import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  submit(): void {
    alert(this.user.name);
  }
}
