import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskType } from '../enums/task-type.enum';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { Utils } from '../utils';

const user = new User({
  id: Utils.uuid(),
  name: 'Jan',
  surname: 'Kowalski'
});

const tasks = [
  new Task({
    id: Utils.uuid(),
    projectId: Utils.uuid(),
    assignedUser: user,
    name: 'Test task 1',
    description: 'Do this asap',
    type: TaskType.Task,
    status: TaskStatus.Todo
  }),
  new Task({
    id: Utils.uuid(),
    projectId: Utils.uuid(),
    assignedUser: user,
    name: 'Test task 2',
    description: 'Do this asap',
    type: TaskType.Bug,
    status: TaskStatus.Todo
  }),
  new Task({
    id: Utils.uuid(),
    projectId: Utils.uuid(),
    assignedUser: user,
    name: 'Test task 3',
    description: 'Do this asap',
    type: TaskType.Task,
    status: TaskStatus.Todo
  }),
  new Task({
    id: Utils.uuid(),
    projectId: Utils.uuid(),
    assignedUser: user,
    name: 'Test task 4',
    description: 'Do this asap',
    type: TaskType.Bug,
    status: TaskStatus.InProgress
  }),
  new Task({
    id: Utils.uuid(),
    projectId: Utils.uuid(),
    assignedUser: user,
    name: 'Test task 5',
    description: 'Do this asap',
    type: TaskType.Bug,
    status: TaskStatus.InProgress
  }),
  new Task({
    id: Utils.uuid(),
    projectId: Utils.uuid(),
    assignedUser: user,
    name: 'Test task 6',
    description: 'Do this asap',
    type: TaskType.Task,
    status: TaskStatus.InProgress
  }),
  new Task({
    id: Utils.uuid(),
    projectId: Utils.uuid(),
    assignedUser: user,
    name: 'Test task 7',
    description: 'Do this asap',
    type: TaskType.Task,
    status: TaskStatus.Done
  }),
  new Task({
    id: Utils.uuid(),
    projectId: Utils.uuid(),
    assignedUser: user,
    name: 'Test task 8',
    description: 'Do this asap',
    type: TaskType.Task,
    status: TaskStatus.Done
  }),
  new Task({
    id: Utils.uuid(),
    projectId: Utils.uuid(),
    assignedUser: user,
    name: 'Test task 9',
    description: 'Do this asap',
    type: TaskType.Bug,
    status: TaskStatus.Done
  })
];

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  constructor(private http: HttpClient) {
  }

  getTasks(projectId: string): Observable<Task[]> {
    return of(tasks);
    /*const httpParams = (new HttpParams()).append('projectId', projectId);
    return this.http.get<Array<Task>>(`${environment.apiUrl}/tasks`, {
      params: httpParams
    }).pipe(map(res => res.map(task => {
      task.assignedUser = task.assignedUser ? new User(task.assignedUser) : null;
      return new Task(task);
    })));*/
  }
}
