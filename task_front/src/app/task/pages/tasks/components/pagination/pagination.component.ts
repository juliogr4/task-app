import { Component, EventEmitter, Input, Output } from '@angular/core';
import { paginationParameter } from 'src/app/task/model/paginationParameter';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 5;
  @Input() totalPages: number = 0;
  @Input() selectedPage: number = 1;
  @Output() selectedPageEvent = new EventEmitter<paginationParameter>();

  onNextPage() {
    const selectedPage = this.selectedPage + 1;
    if(selectedPage > this.totalPages) {
      return;
    }
    this.selectedPage = selectedPage;
    this.onSelectedPage()
  }

  onPreviousPage() {
    const selectedPage = this.selectedPage - 1;
    if(selectedPage < 1)  {
      return;
    }
    this.selectedPage = selectedPage;
    this.onSelectedPage()
  }

  onSelectedPage() {
    const paginationParameter: paginationParameter = { selectedPage: this.selectedPage, pageSize: this.pageSize }
    this.selectedPageEvent.emit(paginationParameter);
  }
}
