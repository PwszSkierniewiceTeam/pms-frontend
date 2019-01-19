import { Component, Inject, OnInit, Optional } from '@angular/core';
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
  endDp: any;
  project: Partial<Project> = {
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    userRole: ProjectUserRole.Admin
  };
  startDp: any;
  type = '';
  settingDate = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectDataService: ProjectDataService,
              @Optional() @Inject(MatSnackBar) private snack: MatSnackBar) {
  }

  goBack() {
    this.router.navigateByUrl('/project');
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['projectId'];

    if (projectId) {
      this.type = 'Update';
      this.settingDate = true;
      this.projectDataService.getProject(projectId).subscribe(res => {
        this.project = res;
        if (this.endDp && this.startDp) {
          setTimeout(() => {
            this.endDp.year = this.project.endDate.getFullYear();
            this.endDp.month = this.project.endDate.getMonth() + 1;
            this.endDp.day = this.project.endDate.getDate();

            this.startDp.year = this.project.startDate.getFullYear();
            this.startDp.month = this.project.startDate.getMonth() + 1;
            this.startDp.day = this.project.startDate.getDate();

            this.settingDate = false;
          });
        }
      });
    } else {
      this.type = 'Create';
    }
  }

  onEndDateChanged(evnt) {
    if (this.settingDate) {
      return;
    }
    this.project.endDate = new Date(evnt.value);
  }

  onEndPickerLoaded(args) {
    if (this.settingDate) {
      return;
    }
    this.endDp = args.object;
  }

  onStartDateChanged(evnt) {
    this.project.startDate = new Date(evnt.value);
  }

  onStartPickerLoaded(args) {
    this.startDp = args.object;
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

    if (this.snack) {
      this.snack.open(message, action, {
        duration: 2000
      });
    }
  }
}
