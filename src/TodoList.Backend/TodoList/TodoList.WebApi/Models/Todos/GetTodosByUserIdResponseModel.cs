namespace TodoList.WebApi.Models.Todos;

public record GetTodosByUserIdResponseModel(IEnumerable<GetTodoByIdResponseModel> Todos);