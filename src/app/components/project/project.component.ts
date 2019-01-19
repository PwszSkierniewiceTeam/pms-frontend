import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NsContainer } from '../../services/ns-container';

@Component({
  selector: 'pms-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectId: string;

  constructor(private route: ActivatedRoute) {
  }

  goBack(): void {
    NsContainer.routerExtensions.back();
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
  }
}
