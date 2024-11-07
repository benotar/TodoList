namespace TodoList.Application.DTOs;

public record TodoDto(
    Guid TodoId,
    Guid UserId,
    string Title,
    bool? IsCompleted
);

public record TodoWithoutUserDto(
    Guid TodoId,
    string Title,
    bool? IsCompleted,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record TodoWithUserDto(
    Guid TodoId,
    UserWithoutTodoDto UserWithoutTodoDto,
    string Title,
    bool? IsCompleted,
    DateTime CreatedAt,
    DateTime UpdatedAt
);