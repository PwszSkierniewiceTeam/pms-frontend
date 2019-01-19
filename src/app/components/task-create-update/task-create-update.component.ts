import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskStatus } from '../../enums/task-status.enum';
import { TaskType } from '../../enums/task-type.enum';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { NsContainer } from '../../services/ns-container';
import { ProjectDataService } from '../../services/project-data.service';
import { TaskDataService } from '../../services/task-data.service';

@Component({
  selector: 'pms-task-create-update',
  templateUrl: './task-create-update.component.html',
  styleUrls: ['./task-create-update.component.scss']
})
export class TaskCreateUpdateComponent implements OnInit {
  nsProjectUsers: any[];
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
              @Optional() @Inject(MatSnackBar) private snack: MatSnackBar) {
  }

  displayTypeDialog() {
    // >> action-dialog-code
    const options = {
      title: 'Task type',
      message: 'Choose task\'s type',
      cancelButtonText: 'Cancel',
      actions: this.taskTypes
    };

    NsContainer.dialogs.action(options).then((result) => {
      if (result !== 'Cancel') {
        this.task.type = result;
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/project/' + this.projectId);
  }

  displayUserDialog() {
    // >> action-dialog-code
    const options = {
      title: 'Assign user to task',
      message: 'Choose user',
      cancelButtonText: 'Cancel',
      actions: this.nsProjectUsers.map(nsU => nsU.action)
    };

    NsContainer.dialogs.action(options).then((result) => {
      if (result !== 'Cancel') {
        this.nsAssignUser(result);
      }
    });
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
    this.task['projectId'] = this.projectId;
    const taskId = this.route.snapshot.params['taskId'];

    if (taskId) {
      this.type = 'Update';
      this.taskDataService.getTask(taskId).subscribe(res => {
        this.task = res;
        setTimeout(() => {
          this.findAssignedUser();
        });
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

  private findAssignedUser() {
    if (this.projectUsers && this.task && this.task.assignedUser) {
      this.task.assignedUser = this.projectUsers.find(u => u.id === this.task.assignedUser.id);
    }
  }

  private initProjectUsers(): void {
    this.projectDataService.getProjectUsers(this.projectId).subscribe(users => {
      this.projectUsers = users;
      this.nsProjectUsers = users.map(u => {
        return {
          action: `${u.fullName} <${u.email}>`,
          user: u
        };
      });
      setTimeout(() => {
        this.findAssignedUser();
      });
    });
  }

  private nsAssignUser(action: any): void {
    this.task.assignedUser = this.nsProjectUsers.find(nsU => nsU.action === action).user;
  }

  private success(message: string, action: string): void {
    this.router.navigate(['/project', this.projectId]);
    if (this.snack) {
      this.snack.open(message, action, {
        duration: 2000
      });
    }
  }
}
