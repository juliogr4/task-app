using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_api.Model.DTO.Request;
using task_api.Service;

namespace task_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult> GetTasks([FromQuery] GetTasksParametersRequest getTasksParametersRequest)
        {
            Thread.Sleep(500);
            var response = await _taskService.GetTasks(getTasksParametersRequest);
            return Ok(response);
        }

        [HttpGet("{task_id}")]
        public async Task<ActionResult> GetTask(int task_id)
        {
            Thread.Sleep(500);
            var response = await _taskService.GetTask(task_id);
            return Ok(response);
        }

        [HttpDelete("{task_id}")]
        public async Task<ActionResult> DeleteTask(int task_id)
        {
            Thread.Sleep(500);
            var response = await _taskService.DeleteTask(task_id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> CreateTask([FromBody] TaskRequest task)
        {
            Thread.Sleep(500);
            var response = await _taskService.CreateTask(task);
            return Ok(response);
        }

        [HttpPut("{task_id}")]
        public async Task<ActionResult> EditTask(int task_id, [FromBody] TaskRequest task)
        {
            Thread.Sleep(500);
            var response = await _taskService.EditTask(task, task_id);
            return Ok(response);
        }
    }
}
