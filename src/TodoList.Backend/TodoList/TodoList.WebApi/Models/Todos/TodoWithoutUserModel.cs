namespace TodoList.WebApi.Models.Todos;

public record TodoWithoutUserModel(
    Guid TodoId,
    string Title,
    bool? IsCompleted,
    DateTime CreatedAt,
    DateTime UpdatedAt
);