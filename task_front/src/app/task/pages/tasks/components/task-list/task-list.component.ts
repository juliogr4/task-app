import { Component, Input } from '@angular/core';
import { ITask } from 'src/app/task/model/itask';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: ITask[] = [];
}
