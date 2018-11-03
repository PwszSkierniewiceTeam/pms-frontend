import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
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

  createProject(project: Partial<Project>): Observable<Partial<Project>> {
    return this.http.post(`${environment.apiUrl}/projects`, project).pipe(
      map(() => project)
    );
  }

  getProject(projectId: string): Observable<Project> {
    return of(projects.find(proj => proj.id === projectId));
    /*return this.http.get(`${environment.apiUrl}/projects/${projectId}`).pipe(
      map(res => new Project(res))
    );*/
  }

  getProjects(): Observable<Project[]> {
    return of(projects);
    /*return this.http.get<Array<any>>(`${environment.apiUrl}/projects`)
      .pipe(
        map(res => res.map(project => new Project(project)))
      );*/
  }

  removeProject(projectId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/projects/${projectId}`);
  }

  updateProject(project: Partial<Project>): Observable<any> {
    return this.http.put(`${environment.apiUrl}/projects/${project.id}`, project);
  }
}
