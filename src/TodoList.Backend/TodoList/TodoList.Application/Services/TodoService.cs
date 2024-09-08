using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;

namespace TodoList.Application.Services;

public class TodoService : ITodoService
{
    private readonly IDbContext _dbContext;

    private readonly IDateTimeProvider _dateTimeProvider;

    public TodoService(IDbContext dbContext, IDateTimeProvider dateTimeProvider)
    {
        _dbContext = dbContext;

        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<Result<IEnumerable<Todo>>> GetAsync()
    {
        var todos = await _dbContext.Todos.ToListAsync();

        return todos.Count is 0
            ? Result<IEnumerable<Todo>>.SuccessWithWarning(WarningCode.TodoTableIsEmpty)
            : Result<IEnumerable<Todo>>.Success(todos);
    }

    public async Task<Result<Todo>> GetByTitleAsync(string title)
    {
        var existingTodo = await FindTodoByConditionAsync(todo => todo.Title.Equals(title));
        
        return existingTodo is null
            ? Result<Todo>.Error(ErrorCode.TodoNotFound)
            : Result<Todo>.Success(existingTodo);
    }

    public async Task<Result<Todo>> GetByIdAsync(Guid todoId)
    {
        var existingTodo = await _dbContext.Todos.FirstOrDefaultAsync(todo => todo.Id.Equals(todoId));

        return existingTodo is null
            ? Result<Todo>.Error(ErrorCode.TodoNotFound)
            : Result<Todo>.Success(existingTodo);
    }

    public async Task<Result<Todo>> CreateAsync(Guid userId, string title, string? description = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<Todo>.Error(ErrorCode.UserIdNotValid);
        }

        if (!await _dbContext.Users.AnyAsync(user => user.Id.Equals(userId)))
        {
            return Result<Todo>.Error(ErrorCode.UserNotFound);
        }

        if (string.IsNullOrEmpty(title))
        {
            return Result<Todo>.Error(ErrorCode.TodoTitleMustNotBeEmpty);
        }

        if (await _dbContext.Todos.AnyAsync(todo => todo.Title.Equals(title)))
        {
            return Result<Todo>.Error(ErrorCode.TodoAlreadyExists);
        }

        var newTodo = new Todo
        {
            UserId = userId,
            Title = title,
            Description = description
        };

        await _dbContext.Todos.AddAsync(newTodo);
        await _dbContext.SaveChangesAsync();


        return Result<Todo>.Success(newTodo);
    }

    public async Task<Result<Todo>> UpdateAsync(Guid todoId, string newTitle, string? newDescription = default)
    {
        var existingTodo = await FindTodoByConditionAsync(todo => todo.Id.Equals(todoId), true);

        if (existingTodo is null)
        {
            return Result<Todo>.Error(ErrorCode.TodoNotFound);
        }

        if (string.Equals(newTitle, existingTodo.Title, StringComparison.OrdinalIgnoreCase)
            && string.Equals(newDescription, existingTodo.Description, StringComparison.OrdinalIgnoreCase))
        {
            return Result<Todo>.Error(ErrorCode.TodoDataIsTheSame);
        }

        existingTodo.Title = newTitle;
        existingTodo.Description = newDescription;
        existingTodo.UpdatedAt = _dateTimeProvider.UtcNow;

        await _dbContext.SaveChangesAsync();

        return Result<Todo>.Success(existingTodo);
    }

    public async Task<Result<None>> DeleteAsync(Guid todoId)
    {
        var existingTodo = await FindTodoByConditionAsync(todo => todo.Id.Equals(todoId));

        if (existingTodo is null)
        {
            return Result<None>.Error(ErrorCode.TodoNotFound);
        }

        _dbContext.Todos.Remove(existingTodo!);

        await _dbContext.SaveChangesAsync();

        return Result<None>.Success();
    }

    // Testing
    private async Task<Todo?> FindTodoByConditionAsync(Expression<Func<Todo, bool>> condition,
        bool isUseTracking = false)
        => isUseTracking switch
        {
            true => await _dbContext.Todos.AsTracking().FirstOrDefaultAsync(condition),
            _ => await _dbContext.Todos.FirstOrDefaultAsync(condition)
        };
}