using TodoList.Application.Common;
using TodoList.Application.DTOs;

namespace TodoList.Application.Interfaces.Services;

public interface ITodoService
{
    Task<Result<IEnumerable<TodoWithUserDto>>> GetTodosAsync();
    Task<Result<IEnumerable<TodoDto>>> GetTodosByUserIdAsync(Guid userId);
    Task<Result<TodoDto>> GetByIdAsync(Guid todoId, Guid userId);
    Task<Result<None>> CreateAsync(Guid userId, string title, bool? isCompleted);
    Task<Result<None>> UpdateAsync(Guid todoId, Guid userId, string newTitle, bool newIsCompleted);
    Task<Result<None>> DeleteAsync(Guid todoId, Guid userId);
    Task<Result<None>> ToggleIsCompleted(Guid todoId, Guid userId);
    
    // For advanced permission
    Task<Result<None>> DeleteAll();
}