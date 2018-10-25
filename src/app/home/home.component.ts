import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'project-management-system';

  constructor() { }

  ngOnInit() {
  }
}
