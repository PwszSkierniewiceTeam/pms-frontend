import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropEvent } from 'ng-drag-drop';
import { TaskStatus } from '../../enums/task-status.enum';
import { Task } from '../../models/task.model';
import { TaskDataService } from '../../services/task-data.service';

@Component({
  selector: 'pms-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  editIcon = String.fromCharCode(0xe3c9);
  projectId: string;
  taskStatus = TaskStatus;
  tasks: Task[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskDataService: TaskDataService) {
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
    this.initTasks();
  }

  onItemDrop(e: DropEvent, taskStatus: TaskStatus): void {
    this.tasks = this.tasks.map(task => task.id === e.dragData.id ? new Task({...task, status: taskStatus}) : task);

    this.taskDataService.updateTask(new Task({
      ...e.dragData,
      status: taskStatus
    })).subscribe();
  }

  onItemTap(item: any) {
    this.router.navigateByUrl('/project/' + this.projectId + '/task/' + this.tasks[item.index].id + '/preview');
  }

  onTaskEdit(task: Task): void {
    this.router.navigateByUrl('/project/' + this.projectId + '/task/' + task.id);
  }

  private initTasks(): void {
    this.taskDataService.getTasks(this.projectId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
