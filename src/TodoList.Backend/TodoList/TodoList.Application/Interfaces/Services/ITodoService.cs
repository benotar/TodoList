using TodoList.Application.Common;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Interfaces.Services;

public interface ITodoService
{
    Task<Result<IEnumerable<Todo>>> GetAsync();
    Task<Result<Todo>> GetByTitleAsync(string title);
    Task<Result<Todo>> GetByIdAsync(Guid todoId);

    Task<Result<Todo>> CreateAsync(Guid userId, string title, string? description = default);
    Task<Result<Todo>> UpdateAsync(Guid todoId, string newTitle, string? newDescription = default);
    Task<Result<None>> DeleteAsync(Guid todoId);
}