import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Alert, AlertType } from '../model/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject: Subject<Alert> = new Subject<Alert>();
  alertObservable$ = this.alertSubject.asObservable();

  constructor() { }

  onSuccess(message: string) {
    this.alertSubject.next({ message: message, alertType: AlertType.Success })
  }

  onError(message: string) {
    this.alertSubject.next({ message: message, alertType: AlertType.Error })
  }

}
