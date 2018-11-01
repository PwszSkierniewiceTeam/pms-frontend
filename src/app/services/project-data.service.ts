import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Array<any>>(`${environment.apiUrl}/projects`)
      .pipe(
        map(res => res.map(project => new Project(project)))
      );
  }
}
