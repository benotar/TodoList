using Microsoft.EntityFrameworkCore;
using TodoList.Application.Common;
using TodoList.Application.Extensions;
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

    private readonly ITodoQueryProvider _todoQueryProvider;

    public TodoService(IDbContext dbContext, IDateTimeProvider dateTimeProvider, ITodoQueryProvider todoQueryProvider)
    {
        _dbContext = dbContext;

        _dateTimeProvider = dateTimeProvider;

        _todoQueryProvider = todoQueryProvider;
    }

    public async Task<Result<IEnumerable<Todo>>> GetAsync()
    {
        var todos = await _dbContext.Todos.AsNoTracking().ToListAsync();

        return todos.Count is 0
            ? Result<IEnumerable<Todo>>.SuccessWithWarning(WarningCode.TodoTableIsEmpty)
            : Result<IEnumerable<Todo>>.Success(todos);
    }

    public async Task<Result<Todo>> GetByTitleAsync(string title, Guid userId)
    {
        var condition = _todoQueryProvider.ByUserId(userId)
            .And(_todoQueryProvider.ByTitle(title));
        
        var existingTodo = await _todoQueryProvider.FindTodoByConditionAsync(condition,
            query => query.FirstOrDefaultAsync());

        return existingTodo is null
            ? Result<Todo>.Error(ErrorCode.TodoNotFound)
            : Result<Todo>.Success(existingTodo);
    }

    public async Task<Result<Todo>> GetByIdAsync(Guid todoId, Guid userId)
    {
        var condition = _todoQueryProvider.ByUserId(userId)
            .And(_todoQueryProvider.ByTodoId(todoId));

        var existingTodo = await _todoQueryProvider.FindTodoByConditionAsync(condition,
            query => query.FirstOrDefaultAsync());

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

        var condition = _todoQueryProvider
            .ByUserId(userId).And(_todoQueryProvider.ByTitle(title));

        var isTodoExists = await _todoQueryProvider
            .FindTodoByConditionAsync(condition, query => query.AnyAsync());

        if (isTodoExists)
        {
            return Result<Todo>.Error(ErrorCode.TodoAlreadyExists);
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

    public async Task<Result<Todo>> UpdateAsync(Guid todoId, Guid userId, string newTitle,
        string? newDescription = default)
    {
        var condition = _todoQueryProvider.ByUserId(userId)
            .And(_todoQueryProvider.ByTodoId(todoId));

        var existingTodo = await _todoQueryProvider.FindTodoByConditionAsync(
            condition, query => query.FirstOrDefaultAsync(), isUseTracking: true);
        
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

    public async Task<Result<None>> DeleteAsync(Guid todoId, Guid userId)
    {
        var condition = _todoQueryProvider.ByUserId(userId).And(_todoQueryProvider.ByTodoId(todoId));

        var existingTodo = await _todoQueryProvider.FindTodoByConditionAsync(
            condition, query => query.FirstOrDefaultAsync());
        
        if (existingTodo is null)
        {
            return Result<None>.Error(ErrorCode.TodoNotFound);
        }
        
        _dbContext.Todos.Remove(existingTodo);
        
        await _dbContext.SaveChangesAsync();

        return Result<None>.Success();
    }
}