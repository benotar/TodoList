using TodoList.Application.DTOs;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Extensions;

public static class EntityExtensions
{
    public static TodoDto ToDto(this Todo todo)
    {
        return new TodoDto(
            todo.Id,
            todo.UserId,
            todo.Title,
            todo.IsCompleted
        );
    }
}