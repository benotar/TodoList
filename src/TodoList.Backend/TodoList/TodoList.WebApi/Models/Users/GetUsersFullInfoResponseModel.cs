namespace TodoList.WebApi.Models.Users;

public record GetUsersFullInfoResponseModel(
    Guid UserId,
    string Username,
    byte[] PasswordSalt,
    byte[] PasswordHash,
    string Name,
    DateTime CreatedAt,
    DateTime UpdatedAt
);