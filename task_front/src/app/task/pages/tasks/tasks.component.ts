import { paginationParameter } from './../../model/paginationParameter';
import { Observable, catchError, delay, finalize, of, shareReplay, tap } from 'rxjs';
import { TaskService } from '../../service/task.service';
import { searchParameter } from './../../model/searchParameter';
import { Component, OnInit, inject } from '@angular/core';
import { IResponse } from '../../model/iresponse';
import { IPagination } from '../../model/ipagination';
import { ITask } from '../../model/itask';
import { LoadingService } from 'src/app/core/service/loading.service';
import { AlertService } from 'src/app/core/service/alert.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  alertService = inject(AlertService);
  isLoading: boolean = false;
  loadingService = inject(LoadingService);
  taskService = inject(TaskService);
  tasks$ = new Observable<IResponse<IPagination<ITask[]>>>();
  searchParameter: searchParameter = { searchText: "", sortBy: "desc" };
  paginationParameter: paginationParameter = { selectedPage: 1, pageSize: 5 };

  ngOnInit(): void {
    this.getTasks();
  }

  onSearch(searchParameter: searchParameter) {
    this.paginationParameter.selectedPage = 1;
    this.searchParameter = searchParameter;
    this.getTasks();
  }

  getTasks() {
    this.isLoading = true;
    this.loadingService.startLoading();
    this.tasks$ = this.taskService.getTasks(this.searchParameter, this.paginationParameter).pipe(
      catchError((error) => {
        this.alertService.onError(error);
        return of();
      }),
      shareReplay(),
      finalize(() => {
        this.loadingService.stopLoading();
        this.isLoading = false;
      })
    );
  }

  onSelectedPage(paginationParameter: paginationParameter) {
    this.paginationParameter = paginationParameter;
    this.getTasks();
  }

}
