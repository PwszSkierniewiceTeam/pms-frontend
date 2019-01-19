import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectDataService } from '../../services/project-data.service';

@Component({
  selector: 'pms-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  editIcon = String.fromCharCode(0xe3c9);
  projects?: Project[];

  constructor(private projectDataService: ProjectDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.projectDataService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  onItemTap(item: any) {
    const index = typeof item === 'number' ? item : item.index;
    this.router.navigateByUrl('/project/' + this.projects[index].id);
  }

  removeProject(project: Project): void {
    this.projectDataService.removeProject(project.id).subscribe(() => {
      if (this.projects) {
        this.projects = this.projects.filter(proj => proj.id !== project.id);
      }
    });
  }
}

