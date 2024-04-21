import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  declarations: [
    LoadingComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    AlertComponent
  ]
})
export class CoreModule { }
