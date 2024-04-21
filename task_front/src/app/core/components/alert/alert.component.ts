import { Component, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { AlertService } from '../../service/alert.service';
import { Alert, AlertType } from '../../model/alert';
import { delay } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alertService = inject(AlertService);
  rendered2 = inject(Renderer2);
  elementRef = inject(ElementRef);
  alert: Alert = {} as Alert;
  alertType = AlertType;

  ngOnInit(): void {
    this.alertService.alertObservable$.subscribe(alert => {
      this.alert = alert;
      if(this.alert) {
        this.toggleAlert();
      }
    })
  };

  toggleAlert() {
    const alert = this.elementRef.nativeElement.querySelector(".alert");
    this.rendered2.addClass(alert, "alert__show");
    setTimeout(() => {
      this.rendered2.removeClass(alert, "alert__show");
      this.rendered2.addClass(alert, "alert__hide");
    }, 3000)
    this.rendered2.removeClass(alert, "alert__hide");
  };

  getAlertIcon(): string {
    switch(this.alert.alertType) {
      case AlertType.Success:
        return "fa-solid fa-check";
      case AlertType.Error:
        return "fa-solid fa-circle-exclamation"
    }
  };

  getEnumNameProperty() {
    switch(this.alert.alertType) {
      case AlertType.Success:
        return this.alertType[AlertType.Success]
      case AlertType.Error:
        return this.alertType[AlertType.Error]
    }
  };

}
