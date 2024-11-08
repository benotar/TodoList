using TodoList.Domain.Enums;

namespace TodoList.Application.DTOs;

public record UserDto(
    Guid UserId,
    string UserName,
    string Name,
    Permission Permission
);

public record UserWithoutTodoDto(
    Guid UserId,
    string UserName,
    byte[] PasswordSalt,
    byte[] PasswordHash,
    string Name,
    Permission Permission,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record UserWithTodoDto(
    Guid UserId,
    string UserName,
    byte[] PasswordSalt,
    byte[] PasswordHash,
    string Name,
    Permission Permission,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    IEnumerable<TodoWithoutUserDto> Todos
);