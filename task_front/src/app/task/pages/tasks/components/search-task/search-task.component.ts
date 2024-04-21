import { searchParameter } from './../../../../model/searchParameter';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnDestroy {
  openDialog: boolean = false;
  searchForm: FormControl = new FormControl("");
  searchSubscription: Subscription = new Subscription();
  @Input() searchParameter: searchParameter = {} as searchParameter;
  @Output() searchEvent = new EventEmitter<searchParameter>();

  constructor() {
    this.searchSubscription = this.searchForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap((text) => this.searchParameter.searchText = text)
    ).subscribe(() => this.onSearch())
  }

  onSortSelected(sort: string) {
    this.searchParameter.sortBy = sort;
  }

  toggleDialog() {
    this.openDialog = !this.openDialog;
  }

  onSearch() {
    this.searchEvent.emit(this.searchParameter);
  }

  onApply() {
    this.toggleDialog();
    this.onSearch()
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
