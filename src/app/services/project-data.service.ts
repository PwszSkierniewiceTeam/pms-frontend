import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ProjectUserRole } from '../enums/project-user-role.enum';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { Utils } from '../utils';

const users = [
  new User({
    email: 'jan.kowalski@example.com',
    id: Utils.uuid(),
    name: 'Jan',
    surname: 'Kowalski'
  }),
  new User({
    email: 'jan.kowalski2@example.com',
    id: Utils.uuid(),
    name: 'Jan2',
    surname: 'Kowalski'
  }),
  new User({
    email: 'jan.kowalski3@example.com',
    id: Utils.uuid(),
    name: 'Jan3',
    surname: 'Kowalski'
  }),
  new User({
    email: 'jan.kowalski4@example.com',
    id: Utils.uuid(),
    name: 'Jan4',
    surname: 'Kowalski'
  })
];

const projects = [
  new Project({
    description: 'Example project 1 description',
    endDate: (new Date()).toISOString(),
    id: '4692ce84-8ef6-494f-a0c9-98f52c92fc61',
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

  addUserToProject(projectId: string, userEmail: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/projects/${projectId}/users`, {email: userEmail});
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

  getProjectUsers(projectId: string): Observable<Array<Partial<User>>> {
    return of(users);
    /*this.http.get<Array<any>>(`${environment.apiUrl}/projects/${projectId}/users`).pipe(
          map(res => res.map(u => new User(u)))
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

  removeUserFromProject(projectId: string, userId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/projects/${projectId}/users/${userId}`);
  }

  updateProject(project: Partial<Project>): Observable<any> {
    return this.http.put(`${environment.apiUrl}/projects/${project.id}`, project);
  }
}
