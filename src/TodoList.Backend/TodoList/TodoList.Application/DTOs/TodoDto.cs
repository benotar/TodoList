namespace TodoList.Application.DTOs;

public record TodoDto(
    Guid TodoId,
    Guid UserId,
    string Title,
    bool IsCompleted
);