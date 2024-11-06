using TodoList.Domain.Enums;

namespace TodoList.Application.DTOs;

public record UserDto(
    Guid UserId,
    string UserName,
    string Name,
    Permission Permission
);

public record UserFullDto(
    Guid UserId,
    string UserName,
    byte[] PasswordSalt,
    byte[] PasswordHash,
    string Name,
    Permission Permission,
    DateTime CreatedAt,
    DateTime UpdatedAt
);