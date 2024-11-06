using TodoList.Domain.Enums;

namespace TodoList.WebApi.Models.Users;

public record GetUsersFullInfoResponseModel(
    Guid UserId,
    string Username,
    byte[] PasswordSalt,
    byte[] PasswordHash,
    string Name,
    Permission Permission,
    DateTime CreatedAt,
    DateTime UpdatedAt
);