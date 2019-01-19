import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'pms-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Output()
  editTask = new EventEmitter<Task>();
  @Input()
  task: Task;

  constructor() {
  }

  ngOnInit() {
  }

  onEdit(): void {
    console.log(this.task);
    this.editTask.emit(this.task);
  }
}
