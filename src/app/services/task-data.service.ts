import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  constructor(private http: HttpClient) {
  }

  createTask(task: Partial<Task>, projectId: string): Observable<any> {
    const httpParams = (new HttpParams()).append('projectId', projectId);

    return this.http.post(`${environment.apiUrl}/tasks`, task, {
      params: httpParams
    });
  }

  getTask(taskId: string): Observable<Task> {
    return this.http.get<{task: Task}>(`${environment.apiUrl}/tasks/${taskId}`).pipe(map(res => res.task));
  }

  getTasks(projectId: string): Observable<Task[]> {
    const httpParams = (new HttpParams()).append('projectId', projectId);

    return this.http.get<Array<Task>>(`${environment.apiUrl}/tasks`, {
      params: httpParams
    }).pipe(
      map(res => res.map(task => {
        task.assignedUser = task.assignedUser ? new User(task.assignedUser) : null;
        return new Task(task);
      }))
    );
  }

  updateTask(task: Partial<Task>): Observable<any> {
    return this.http.put(`${environment.apiUrl}/tasks/${task.id}`, task);
  }
}
