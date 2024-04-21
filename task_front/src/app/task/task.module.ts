import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AddEditTaskComponent } from './pages/add-edit-task/add-edit-task.component';
import { TaskLayoutComponent } from './pages/task-layout/task-layout.component';
import { SearchTaskComponent } from './pages/tasks/components/search-task/search-task.component';
import { PaginationComponent } from './pages/tasks/components/pagination/pagination.component';
import { TaskListComponent } from './pages/tasks/components/task-list/task-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TasksComponent,
    AddEditTaskComponent,
    TaskLayoutComponent,
    SearchTaskComponent,
    PaginationComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
