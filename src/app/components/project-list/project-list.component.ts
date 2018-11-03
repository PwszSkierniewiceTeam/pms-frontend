import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectDataService } from '../../services/project-data.service';

@Component({
  selector: 'pms-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects?: Project[];

  constructor(private projectDataService: ProjectDataService) {
  }

  ngOnInit(): void {
    this.projectDataService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  removeProject(project: Project): void {
    this.projectDataService.removeProject(project.id).subscribe(() => {
      if (this.projects) {
        this.projects = this.projects.filter(proj => proj.id !== project.id);
      }
    });
  }
}
