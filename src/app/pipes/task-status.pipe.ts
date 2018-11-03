import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../enums/task-status.enum';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskStatusPipe'
})
export class TaskStatusPipe implements PipeTransform {
  transform(value: Task[], arg: TaskStatus): any {
    return value.filter(task => task.status === arg);
  }
}
