namespace task_api.Model.DTO.Request
{
    public class GetTasksParametersRequest
    {
        public int SelectedPage { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public string SearchText { get; set; } = string.Empty;
        public string SortBy { get; set; } = "desc";
    }
}
