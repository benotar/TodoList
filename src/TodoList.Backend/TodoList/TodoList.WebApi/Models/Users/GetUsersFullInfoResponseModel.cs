using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Todos;

namespace TodoList.WebApi.Models.Users;

public record GetUsersFullInfoResponseModel(
    Guid UserId,
    string UserName,
    byte[] PasswordSalt,
    byte[] PasswordHash,
    string Name,
    Permission Permission,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    IEnumerable<TodoWithoutUserModel> Todos
);