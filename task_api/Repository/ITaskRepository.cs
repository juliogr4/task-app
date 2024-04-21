using task_api.Model.DTO.Request;
using task_api.Model.DTO.Response;
using task_api.Model.Entity;

namespace task_api.Repository
{
    public interface ITaskRepository
    {
        Task<bool> DeleteTask(int task_id);
        Task<bool> CreateTask(TaskEntity task);
        Task<bool> EditTask(TaskEntity task);
        Task<TaskEntity?> GetTask(int task_id);
        Task<PageResponse<IEnumerable<TaskEntity>>> GetTasks(GetTasksParametersRequest getTasksParametersRequest);
    }
}
