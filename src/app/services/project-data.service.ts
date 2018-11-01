import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProjectUserRole } from '../enums/project-user-role.enum';
import { Project } from '../models/project.model';
import { Utils } from '../utils';

const projects = [
  new Project({
    description: 'Example project 1 description',
    endDate: (new Date()).toISOString(),
    id: Utils.uuid(),
    name: 'Example project 1',
    startDate: new Date(),
    userRole: ProjectUserRole.Admin
  }),
  new Project({
    description: 'Example project 2 description',
    endDate: (new Date()).toISOString(),
    id: Utils.uuid(),
    name: 'Example project 2',
    startDate: new Date(),
    userRole: ProjectUserRole.User
  }),
  new Project({
    description: 'Example project 3 description',
    endDate: (new Date()).toISOString(),
    id: Utils.uuid(),
    name: 'Example project 3',
    startDate: new Date(),
    userRole: ProjectUserRole.User
  }),
  new Project({
    description: 'Example project 4 description',
    endDate: (new Date()).toISOString(),
    id: Utils.uuid(),
    name: 'Example project 4',
    startDate: new Date(),
    userRole: ProjectUserRole.User
  })
];

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return of(projects);
    /*return this.http.get<Array<any>>(`${environment.apiUrl}/projects`)
      .pipe(
        map(res => res.map(project => new Project(project)))
      );*/
  }
}
