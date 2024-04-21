import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscription, catchError, delay, finalize, map, of, switchMap, tap } from 'rxjs';
import { ITask } from '../../model/itask';
import { TaskService } from '../../service/task.service';
import { LoadingService } from 'src/app/core/service/loading.service';
import { AlertService } from 'src/app/core/service/alert.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent implements OnInit, OnDestroy {
  alertService = inject(AlertService);
  loadingService = inject(LoadingService);
  taskService = inject(TaskService);
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  unsubscribe: Subscription = new Subscription();

  taskForm: FormGroup = this.formBuilder.group({
    id: [-1, Validators.required],
    name: ["", Validators.required],
    action: ["Create", Validators.required]
  });

  get action(): string {
    return this.taskForm.get("action")?.value;
  }

  navigateToHomePage() {
    this.router.navigate(["/"]);
  };

  ngOnInit(): void {
    this.unsubscribe = this.activedRoute.params.pipe(
      map(param => param["task_id"]),
      switchMap((taskID: number | undefined) => {
        if(!!taskID) {
          this.loadingService.startLoading();
          return this.taskService.getTaskById(taskID).pipe(
            catchError((error) => {
              this.alertService.onError(error);
              this.navigateToHomePage();        // avoid continuing
              return EMPTY;
            }),
            tap((task) => {
              this.taskForm.setValue({
                id: task.data.id,
                name: task.data.name,
                action: "Edit"
              })
            }),
            finalize(() => this.loadingService.stopLoading())
          )
        }
        return of();
      })
    ).subscribe();
  }

  onDelete() {
    if(confirm("would you like to delete this task?")) {
      this.loadingService.startLoading();
      this.taskService.removeTask(this.taskForm.get("id")?.value).pipe(
        tap(() => this.navigateToHomePage()),
        catchError((error: string) => {
          this.alertService.onError(error);
          return of();
        }),
        tap(response => this.alertService.onSuccess(response.message)),
        finalize(() => this.loadingService.stopLoading())
      ).subscribe();
    };
  }

  onSave() {
    if(!this.taskForm.valid) {
      this.alertService.onError("All fieds must be filled out");
      return;
    };

    this.loadingService.startLoading();

    const task: ITask = {
      id: this.taskForm.get("id")?.value,
      name: this.taskForm.get("name")?.value,
    };

    const operation = this.action.toLowerCase() === 'edit' ?
      this.taskService.updateTask(task):
      this.taskService.createTask(task);

    operation.pipe(
      catchError((error: string) => {
        this.alertService.onError(error);
        return of();
      }),
      tap(response => {
        this.alertService.onSuccess(response.message);
        this.navigateToHomePage();
      }),
      finalize(() => this.loadingService.stopLoading())
    ).subscribe();
  };

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  };
}
