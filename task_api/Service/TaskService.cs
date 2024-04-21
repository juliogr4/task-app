
using task_api.Model.DTO.Request;
using task_api.Model.DTO.Response;
using task_api.Model.Entity;
using task_api.Repository;

namespace task_api.Service
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<ApiResponse<string>> CreateTask(TaskRequest task)
        {
            var newTask = new TaskEntity { Name = task.Name };
            await _taskRepository.CreateTask(newTask);

            return new ApiResponse<string>
            {
                Message = "Task created successfully",
                Success = true
            };
        }

        public async Task<ApiResponse<string>> DeleteTask(int task_id)
        {
            await _taskRepository.DeleteTask(task_id);

            return new ApiResponse<string>
            {
                Message = "Task deleted successfully",
                Success = true
            };
        }

        public async Task<ApiResponse<string>> EditTask(TaskRequest task, int task_id)
        {
            var updatedTask = new TaskEntity { Id = task_id, Name = task.Name };

            await _taskRepository.EditTask(updatedTask);

            return new ApiResponse<string>
            {
                Message = "Task edited successfully",
                Success = true
            };
        }

        public async Task<ApiResponse<TaskResponse?>> GetTask(int task_id)
        {
            var task = await _taskRepository.GetTask(task_id);
            
            return new ApiResponse<TaskResponse?>
            {
                Data = task != null ? new TaskResponse { Id = task.Id, Name = task.Name } : null,
                Message = "",
                Success = true
            };
        }

        public async Task<ApiResponse<PageResponse<IEnumerable<TaskResponse>>>> GetTasks(GetTasksParametersRequest getTasksParametersRequest)
        {
            var pageResult = await _taskRepository.GetTasks(getTasksParametersRequest);

            var paginationMapper = new PageResponse<IEnumerable<TaskResponse>>(
                data: pageResult.Data.Select(task => new TaskResponse { Id = task.Id, Name = task.Name }),
                totalItems: pageResult.TotalItems,
                pageSize: pageResult.PageSize,
                selectedPage: pageResult.SelectedPage
            );

            return new ApiResponse<PageResponse<IEnumerable<TaskResponse>>>
            {
                Data = paginationMapper,
                Message = "",
                Success = true
            };
        }
    }
}
