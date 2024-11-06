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

    public static UserDto ToDto(this User user)
    {
        return new UserDto(
            user.Id,
            user.UserName,
            user.Name,
            user.Permission
        );
    }
    
    public static UserFullDto ToFullDto(this User user)
    {
        return new UserFullDto(
            user.Id,
            user.UserName,
            user.PasswordSalt,
            user.PasswordHash,
            user.Name,
            user.Permission,
            user.CreatedAt,
            user.UpdatedAt
        );
    }
}