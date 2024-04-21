export interface IPagination<T> {
  totalItems: number;
  pageSize: number;
  totalPages: number;
  selectedPage: number;
  data: T | null;
}
