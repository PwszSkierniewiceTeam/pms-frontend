import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskStatus } from '../../enums/task-status.enum';
import { Task } from '../../models/task.model';
import { TaskDataService } from '../../services/task-data.service';

@Component({
  selector: 'pms-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  done: Task[];
  inProgress: Task[];
  projectId: string;
  todo: Task[];

  constructor(private route: ActivatedRoute, private taskDataService: TaskDataService) {
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
    this.initTasks();
  }

  private initTasks(): void {
    this.taskDataService.getTasks(this.projectId).subscribe(tasks => {
      this.todo = tasks.filter(t => t.status === TaskStatus.Todo);
      this.inProgress = tasks.filter(t => t.status === TaskStatus.InProgress);
      this.done = tasks.filter(t => t.status === TaskStatus.Done);
    });
  }

}
