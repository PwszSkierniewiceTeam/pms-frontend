import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { ProjectDataService } from '../../services/project-data.service';

@Component({
  selector: 'pms-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit {
  projectId: string;
  userEmail: string;
  users: Partial<User>[];

  constructor(private route: ActivatedRoute, private projectDataService: ProjectDataService) {
  }

  addUser(): void {
    if (this.userEmail.length > 0) {
      this.projectDataService.addUserToProject(this.projectId, this.userEmail).subscribe(res => {
        this.getUsers();
        this.userEmail = '';
      });
    }
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
    this.getUsers();
  }

  removeUser(user: Partial<User>): void {
    this.projectDataService.removeUserFromProject(this.projectId, user.id).subscribe(res => {
      this.users = this.users.filter(u => u.id !== user.id);
    });
  }

  private getUsers(): void {
    this.projectDataService.getProjectUsers(this.projectId).subscribe(users => {
      this.users = users;
    });
  }
}
