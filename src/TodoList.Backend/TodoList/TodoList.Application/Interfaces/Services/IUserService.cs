using TodoList.Application.Common;
using TodoList.Application.DTOs;
using TodoList.Domain.Enums;

namespace TodoList.Application.Interfaces.Services;

public interface IUserService
{
    Task<Result<None>> CreateAsync(string userName, string password, string name, Permission permission);
    Task<Result<UserDto>> GetByUserNameAndCheckPasswordAsync(string userName, string password);
    Task<Result<None>> Update(Guid userId, string userName, string name);
    Task<Result<None>> UpdatePermission(Guid userId, Permission permission);
    Task<Result<None>> DeleteById(Guid userId);
    Task<Result<None>> DeleteBasicUsers();
    Task<Result<IEnumerable<UserWithTodoDto>>> GetUsersFullInfoAsync();
    Task<bool> IsUserExistByIdAsync(Guid userId);
}