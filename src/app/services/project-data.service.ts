import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';

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
    return this.http.get(`${environment.apiUrl}/projects/${projectId}`).pipe(
      map(res => new Project(res))
    );
  }

  getProjectUsers(projectId: string): Observable<Array<Partial<User>>> {
    return this.http.get<Array<any>>(`${environment.apiUrl}/projects/${projectId}/users`).pipe(
      map(res => res.map(u => new User(u)))
    );
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Array<any>>(`${environment.apiUrl}/projects`)
      .pipe(
        map(res => res.map(project => new Project(project)))
      );
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
