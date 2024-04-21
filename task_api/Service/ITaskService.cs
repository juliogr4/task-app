using task_api.Model.DTO.Request;
using task_api.Model.DTO.Response;

namespace task_api.Service
{
    public interface ITaskService
    {
        Task<ApiResponse<string>> DeleteTask(int task_id);
        Task<ApiResponse<string>> CreateTask(TaskRequest task);
        Task<ApiResponse<string>> EditTask(TaskRequest task, int task_id);
        Task<ApiResponse<TaskResponse?>> GetTask(int task_id);
        Task<ApiResponse<PageResponse<IEnumerable<TaskResponse>>>> GetTasks(GetTasksParametersRequest getTasksParametersRequest);
    }
}
