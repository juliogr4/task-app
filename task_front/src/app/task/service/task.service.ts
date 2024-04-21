import { paginationParameter } from './../model/paginationParameter';
import { searchParameter } from './../model/searchParameter';
import { IResponse } from './../model/iresponse';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../model/itask';
import { Observable, catchError, delay, first, of, throwError } from 'rxjs';
import { IPagination } from '../model/ipagination';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly BASE_URL: string = "https://localhost:7157/api/Task";
  constructor(private http: HttpClient) { }

  getTasks(
    searchParameter: searchParameter,
    paginationParameter: paginationParameter
  ): Observable<IResponse<IPagination<ITask[]>>> {

    let params = new HttpParams();

    for(const [key, value] of Object.entries(searchParameter)) {
      if(value != null && value != "") {
        params = params.append(key, value);
      }
    }

    for(const [key, value] of Object.entries(paginationParameter)) {
      if(value != null) params = params.append(key, value);
    }

    return this.http.get<IResponse<IPagination<ITask[]>>>(this.BASE_URL, { params: params }).pipe(
      catchError((error) => this.handleError(error))
    )
  }

  getTaskById(taskID: number): Observable<IResponse<ITask>> {
    return this.http.get<IResponse<ITask>>(`${this.BASE_URL}/${taskID}`).pipe(
      catchError((error) => this.handleError(error))
    )
  }

  removeTask(taskID: number): Observable<IResponse<null>> {
    return this.http.delete<IResponse<null>>(`${this.BASE_URL}/${taskID}`).pipe(
      catchError((error) => this.handleError(error))
    )
  }

  updateTask(task: ITask): Observable<IResponse<null>> {
    return this.http.put<IResponse<null>>(`${this.BASE_URL}/${task.id}`, task).pipe(
      catchError((error) => this.handleError(error))
    )
  }

  createTask(task: ITask): Observable<IResponse<null>> {
    return this.http.post<IResponse<null>>(this.BASE_URL, task).pipe(
      catchError((error) => this.handleError(error))
    )
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => {
      return "houve algum erro";
    });
  }
}
