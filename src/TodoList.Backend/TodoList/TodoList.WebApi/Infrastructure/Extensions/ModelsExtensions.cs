using TodoList.Application.DTOs;
using TodoList.WebApi.Models.Todos;
using TodoList.WebApi.Models.Users;

namespace TodoList.WebApi.Infrastructure.Extensions;

public static class ModelsExtensions
{
    public static GetUsersFullInfoResponseModel ToModel(this UserWithTodoDto dto)
    {
        return new GetUsersFullInfoResponseModel
        (
            dto.UserId,
            dto.UserName,
            dto.PasswordSalt,
            dto.PasswordHash,
            dto.Name,
            dto.Permission,
            dto.CreatedAt,
            dto.UpdatedAt,
            dto.Todos.Select(todo => todo.ToModel())
        );
    }

    public static GetFullInfoTodosResponseModel ToModel(this TodoWithUserDto dto)
    {
        return new GetFullInfoTodosResponseModel
        (
            dto.TodoId,
            dto.UserWithoutTodoDto.ToModel(),
            dto.Title,
            dto.IsCompleted,
            dto.CreatedAt,
            dto.UpdatedAt
        );
    }

    public static GetTodoByIdResponseModel ToModel(this TodoDto dto)
    {
        return new GetTodoByIdResponseModel(
            dto.TodoId,
            dto.UserId,
            dto.Title,
            dto.IsCompleted
        );
    }

    private static TodoWithoutUserModel ToModel(this TodoWithoutUserDto dto)
    {
        return new TodoWithoutUserModel
        (
            dto.TodoId,
            dto.Title,
            dto.IsCompleted,
            dto.CreatedAt,
            dto.UpdatedAt
        );
    }

    private static UserWithoutTodoResponseModel ToModel(this UserWithoutTodoDto dto)
    {
        return new UserWithoutTodoResponseModel
        (
            dto.UserId,
            dto.UserName,
            dto.PasswordSalt,
            dto.PasswordHash,
            dto.Name,
            dto.Permission,
            dto.CreatedAt,
            dto.UpdatedAt
        );
    }
}