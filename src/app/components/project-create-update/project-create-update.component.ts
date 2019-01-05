import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectUserRole } from '../../enums/project-user-role.enum';
import { Project } from '../../models/project.model';
import { ProjectDataService } from '../../services/project-data.service';

@Component({
  selector: 'pms-project-create-update',
  templateUrl: './project-create-update.component.html',
  styleUrls: ['./project-create-update.component.scss']
})
export class ProjectCreateUpdateComponent implements OnInit {
  project: Partial<Project> = {
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    userRole: ProjectUserRole.Admin
  };
  type = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectDataService: ProjectDataService,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['projectId'];

    if (projectId) {
      this.type = 'Update';
      this.projectDataService.getProject(projectId).subscribe(res => {
        this.project = res;
      });
    } else {
      this.type = 'Create';
    }
  }

  submit(): void {
    if (this.type === 'Update') {
      const project = {
        ...this.project,
        startDate: this.project.startDate,
        endDate: this.project.endDate
      };

      delete project['_endDate'];
      delete project['_startDate'];

      this.projectDataService.updateProject(project).subscribe(() => {
        this.success('Project updated', 'Dismiss');
      });
    } else {
      this.projectDataService.createProject(this.project).subscribe(() => {
        this.success('Project created', 'Dismiss');
      });
    }
  }

  private success(message: string, action: string): void {
    this.router.navigate(['/project']);
    this.snack.open(message, action, {
      duration: 2000
    });
  }
}
