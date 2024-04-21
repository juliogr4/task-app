namespace task_api.Model.DTO.Response
{
    public class PageResponse<T>
    {
        public int TotalItems { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int SelectedPage { get; set; }
        public T Data { get; set; }
        public int SkipRows { get; set; }

            public PageResponse(int totalItems, int pageSize, int selectedPage, T data)
            {
                TotalItems = totalItems;
                Data = data;
                PageSize = Math.Min(Math.Max(pageSize, 1), 10);
                TotalPages = (int)Math.Ceiling((double)TotalItems / (double)PageSize);

                SelectedPage = selectedPage > TotalPages ?
                    Math.Min(selectedPage, TotalPages) :
                    Math.Max(selectedPage, 1);

                SkipRows = TotalItems > 0 ? (SelectedPage - 1) * PageSize : 0;
            }
    }
}
