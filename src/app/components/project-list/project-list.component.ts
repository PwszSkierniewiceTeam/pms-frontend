import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from '../../services/project-data.service';

@Component({
  selector: 'pms-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  constructor(private projectDataService: ProjectDataService) {
  }

  ngOnInit(): void {
    this.projectDataService.getProjects().subscribe(projects => {
      console.log(projects);
    });
  }
}
