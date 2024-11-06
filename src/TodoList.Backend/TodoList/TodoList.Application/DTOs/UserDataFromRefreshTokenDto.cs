using TodoList.Domain.Enums;

namespace TodoList.Application.DTOs;

public record UserDataFromRefreshTokenDto(Guid UserId, Permission Permission);