namespace TodoList.WebApi.Models.Todos;

public record GetTodoByIdResponseModel(
    Guid TodoId,
    Guid UserId,
    string Title,
    bool? IsCompleted
);