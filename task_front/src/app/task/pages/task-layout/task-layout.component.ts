import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-task-layout',
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.css']
})
export class TaskLayoutComponent {
  router = inject(Router)
  isHomePage: boolean = false;

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((route: NavigationEnd) => route.url === "/"),
      tap((result) => this.isHomePage = result)
    ).subscribe();
  }
}
