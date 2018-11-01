import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'pms-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user?: User;

  constructor(private sessionService: SessionService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.user;
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/', 'login']);
  }
}
