import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskLayoutComponent } from './pages/task-layout/task-layout.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AddEditTaskComponent } from './pages/add-edit-task/add-edit-task.component';

const routes: Routes = [
  {
    path: "", component: TaskLayoutComponent, children: [
      { path: "", component: TasksComponent, title: "tasks" },
      { path: "edit-task/:task_id", component: AddEditTaskComponent, title: "edit-task" },
      { path: "add-task", component: AddEditTaskComponent, title: "add-task" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
