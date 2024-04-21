import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loadingObservable$ = this.loadingSubject.asObservable();

  constructor() { }

  startLoading() {
    this.loadingSubject.next(true);
  }

  stopLoading() {
    this.loadingSubject.next(false);
  }


}
