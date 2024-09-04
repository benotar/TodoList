using TodoList.Application.Common;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Interfaces.Services;

public interface ITodoService
{
    Task<Result<Todo>> CreateAsync();
}