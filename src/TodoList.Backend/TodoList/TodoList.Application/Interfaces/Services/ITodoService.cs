using System.Linq.Expressions;
using TodoList.Application.Common;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Interfaces.Services;

public interface ITodoService
{
    Task<Result<IEnumerable<Todo>>> GetAsync();
    Task<Result<Todo>> GetByTitleAsync(string title, Guid userId);
    Task<Result<Todo>> GetByIdAsync(Guid todoId, Guid userId);
    Task<Result<Todo>> CreateAsync(Guid userId, string title, string? description = default);
    Task<Result<Todo>> UpdateAsync(Guid todoId, Guid userId ,string newTitle, string? newDescription = default);
    Task<Result<None>> DeleteAsync(Guid todoId, Guid userId);
}