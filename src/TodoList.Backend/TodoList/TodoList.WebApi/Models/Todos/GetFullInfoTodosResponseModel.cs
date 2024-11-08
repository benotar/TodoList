using TodoList.WebApi.Models.Users;

namespace TodoList.WebApi.Models.Todos;

public record GetFullInfoTodosResponseModel(
    Guid TodoId,
    UserWithoutTodoResponseModel User,
    string Title,
    bool? IsCompleted,
    DateTime CreatedAt,
    DateTime UpdatedAt
);