using TodoList.Application.Common;
using TodoList.Application.DTOs;
using TodoList.Domain.Enums;

namespace TodoList.Application.Interfaces.Services;

public interface IUserService
{
    Task<Result<None>> CreateAsync(string userName, string password, string name, Permission permission);
    Task<Result<UserDto>> GetByUserNameAndCheckPasswordAsync(string userName, string password);
    
    Task<Result<IEnumerable<UserWithTodoDto>>> GetUsersFullInfoAsync();
    Task<bool> IsUserExistByIdAsync(Guid userId);
}