import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectDataService } from '../../services/project-data.service';

@Component({
  selector: 'pms-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;

  constructor(private route: ActivatedRoute, private projectDataService: ProjectDataService) {
  }

  ngOnInit() {
    this.projectDataService.getProject(this.route.snapshot.params['projectId']).subscribe(project => {
      this.project = project;
    });
  }

}
