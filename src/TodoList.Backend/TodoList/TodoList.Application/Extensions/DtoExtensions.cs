using TodoList.Application.DTOs;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Extensions;

public static class DtoExtensions
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

    public static TodoWithUserDto ToTodoWithoutUser(this Todo todo)
    {
        return new TodoWithUserDto(
            todo.Id,
            todo.User.ToUserWithoutTodoDto(),
            todo.Title,
            todo.IsCompleted,
            todo.CreatedAt,
            todo.CreatedAt
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

    public static UserWithTodoDto ToUserWithTodoDto(this User user)
    {
        return new UserWithTodoDto(
            user.Id,
            user.UserName,
            user.PasswordSalt,
            user.PasswordHash,
            user.Name,
            user.Permission,
            user.CreatedAt,
            user.UpdatedAt,
            user.Todos.Select(todo => todo.ToForUserDto())
        );
    }

    private static UserWithoutTodoDto ToUserWithoutTodoDto(this User user)
    {
        return new UserWithoutTodoDto(
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

    private static TodoWithoutUserDto ToForUserDto(this Todo todo)
    {
        return new TodoWithoutUserDto(
            todo.Id,
            todo.Title,
            todo.IsCompleted,
            todo.CreatedAt,
            todo.CreatedAt
        );
    }
}