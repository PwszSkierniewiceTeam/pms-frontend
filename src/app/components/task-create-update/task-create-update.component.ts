import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskStatus } from '../../enums/task-status.enum';
import { TaskType } from '../../enums/task-type.enum';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { ProjectDataService } from '../../services/project-data.service';
import { TaskDataService } from '../../services/task-data.service';

@Component({
  selector: 'pms-task-create-update',
  templateUrl: './task-create-update.component.html',
  styleUrls: ['./task-create-update.component.scss']
})
export class TaskCreateUpdateComponent implements OnInit {
  projectId: string;
  projectUsers: Array<Partial<User>> = [];
  task: Partial<Task> = {
    name: '',
    description: '',
    type: TaskType.Task,
    status: TaskStatus.Todo
  };
  taskId: string;
  taskStatus = TaskStatus;
  taskTypes = [TaskType.Bug, TaskType.Task];
  type = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private taskDataService: TaskDataService,
              private projectDataService: ProjectDataService,
              private snack: MatSnackBar) {
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
    this.task['projectId'] = this.projectId;
    const taskId = this.route.snapshot.params['taskId'];

    if (taskId) {
      this.type = 'Update';
      this.taskDataService.getTask(taskId).subscribe(res => {
        this.task = res;
      });
    } else {
      this.type = 'Create';
    }

    this.initProjectUsers();
  }

  submit(): void {
    if (this.type === 'Update') {
      this.taskDataService.updateTask(this.task).subscribe(() => {
        this.success('Task updated', 'Dismiss');
      });
    } else {
      this.taskDataService.createTask(this.task, this.projectId).subscribe(() => {
        this.success('Task created', 'Dismiss');
      });
    }
  }

  private initProjectUsers(): void {
    this.projectDataService.getProjectUsers(this.projectId).subscribe(users => {
      this.projectUsers = users;
    });
  }

  private success(message: string, action: string): void {
    this.router.navigate(['/project', this.projectId]);
    this.snack.open(message, action, {
      duration: 2000
    });
  }
}