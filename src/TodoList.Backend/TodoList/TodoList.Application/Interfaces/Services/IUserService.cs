using TodoList.Application.Common;
using TodoList.Application.DTOs;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Interfaces.Services;

public interface IUserService
{
    Task<Result<User>> CreateAsync(string username, string password, string name);

    Task<Result<User>> GetExistingUser(string username, string password);
}