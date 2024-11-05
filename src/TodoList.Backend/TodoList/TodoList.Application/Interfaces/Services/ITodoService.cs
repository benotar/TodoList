using System.Linq.Expressions;
using TodoList.Application.Common;
using TodoList.Application.DTOs;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Interfaces.Services;

public interface ITodoService
{
    Task<Result<IEnumerable<TodoDto>>> GetAsync(Guid userId);
    Task<Result<TodoDto>> GetByIdAsync(Guid todoId, Guid userId);
    Task<Result<None>> CreateAsync(Guid userId, string title, bool isCompleted);
    Task<Result<None>> UpdateAsync(Guid todoId, Guid userId, string newTitle, bool newIsCompleted);
    Task<Result<None>> DeleteAsync(Guid todoId, Guid userId);
}