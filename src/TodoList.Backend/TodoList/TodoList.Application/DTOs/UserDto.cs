namespace TodoList.Application.DTOs;

public record UserDto(
    Guid UserId,
    string Username,
    string Name
);

public record UserFullDto(
    Guid UserId,
    string Username,
    byte[] PasswordSalt,
    byte[] PasswordHash,
    string Name,
    DateTime CreatedAt,
    DateTime UpdatedAt
);