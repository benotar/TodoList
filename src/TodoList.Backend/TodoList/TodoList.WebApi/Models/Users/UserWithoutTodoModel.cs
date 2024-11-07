using TodoList.Domain.Enums;

namespace TodoList.WebApi.Models.Users;

public record UserWithoutTodoModel(
    Guid UserId,
    string UserName,
    byte[] PasswordSalt,
    byte[] PasswordHash,
    string Name,
    Permission Permission,
    DateTime CreatedAt,
    DateTime UpdatedAt
);