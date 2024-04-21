using Dapper;
using System.Data;
using System.Threading.Tasks;
using task_api.Database;
using task_api.Model.DTO.Request;
using task_api.Model.DTO.Response;
using task_api.Model.Entity;
using task_api.Util;

namespace task_api.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DapperContext _dapperContext;
        public TaskRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        public async Task<bool> CreateTask(TaskEntity task)
        {
            using(var conn = _dapperContext.CreateConnection())
            {
                // procedure
                var procedure = Procedure.pr_task_create;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("name", task.Name);

                // execute
                return await conn.ExecuteScalarAsync<int>(procedure, parameters) > 0;
            }
        }

        public async Task<bool> DeleteTask(int task_id)
        {
            using(var conn = _dapperContext.CreateConnection())
            {
                // procedure
                var procedure = Procedure.pr_task_delete;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("id", task_id);

                // execute
                return await conn.ExecuteScalarAsync<int>(procedure, parameters) > 0;
            }
        }

        public async Task<bool> EditTask(TaskEntity task)
        {
            using (var conn = _dapperContext.CreateConnection())
            {
                // procedure
                var procedure = Procedure.pr_task_update;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("id", task.Id);
                parameters.Add("name", task.Name);

                // execute
                return await conn.ExecuteScalarAsync<int>(procedure, parameters) > 0;
            }
        }

        public async Task<TaskEntity?> GetTask(int task_id)
        {
            using (var conn = _dapperContext.CreateConnection())
            {
                // procedure
                var procedure = Procedure.pr_task_get_by_id;

                // parameters
                var parameters = new DynamicParameters();
                parameters.Add("id", task_id);

                // execute
                return await conn.QueryFirstOrDefaultAsync<TaskEntity?>(procedure, parameters);
            }
        }

        public async Task<PageResponse<IEnumerable<TaskEntity>>> GetTasks(GetTasksParametersRequest getTasksParametersRequest)
        {
            using (var conn = _dapperContext.CreateConnection())
            {
                // Obter total de itens
                var procedure = Procedure.pr_task_get_total_records;

                int totalItems = await conn.QueryFirstOrDefaultAsync<int>(
                    procedure,
                    new { search_text = getTasksParametersRequest.SearchText }
                );

                // Calcular paginacao
                var pagination = new PageResponse<string>(
                    data: string.Empty,
                    totalItems: totalItems,
                    pageSize: getTasksParametersRequest.PageSize,
                    selectedPage: getTasksParametersRequest.SelectedPage
                );

                // Obter tarefas
                procedure = Procedure.pr_task_get_all;

                var parameters = new DynamicParameters();
                parameters.Add("search_text", getTasksParametersRequest.SearchText);
                parameters.Add("sort", getTasksParametersRequest.SortBy);
                parameters.Add("page_size", pagination.PageSize);
                parameters.Add("skip_rows", pagination.SkipRows);

                var tasks = await conn.QueryAsync<TaskEntity>(procedure, parameters);

                // Retornar resposta
                return new PageResponse<IEnumerable<TaskEntity>>
                (
                    totalItems: pagination.TotalItems,
                    pageSize: pagination.PageSize,
                    selectedPage: pagination.SelectedPage,
                    data: tasks
                );
            }
        }
    }
}
