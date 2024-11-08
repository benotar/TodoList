using TodoList.Application.Common;
using TodoList.Application.DTOs;
using TodoList.Domain.Enums;

namespace TodoList.Application.Interfaces.Services;

public interface IUserService
{
    Task<Result<None>> CreateAsync(string userName, string password, string name, Permission permission);
    Task<Result<UserDto>> GetByUserNameAndCheckPasswordAsync(string userName, string password);
    Task<Result<None>> UpdateAsync(Guid userId, string userName, string name);
    Task<Result<None>> UpdatePermissionAsync(Guid userId, Permission permission);
    Task<Result<None>> DeleteByIdAsync(Guid userId);
    Task<Result<None>> DeleteBasicUsersAsync();
    Task<Result<IEnumerable<UserWithTodoDto>>> GetUsersFullInfoAsync();
    Task<bool> IsUserExistByIdAsync(Guid userId);
}