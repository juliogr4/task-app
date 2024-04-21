import { Component, inject } from '@angular/core';
import { LoadingService } from '../../service/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl:

  './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
  loading$: Observable<boolean> = this.loadingService.loadingObservable$;
}
