import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pms-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectId: string;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  goBack(): void {
    this.router.navigate(['/project']);
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
  }
}
