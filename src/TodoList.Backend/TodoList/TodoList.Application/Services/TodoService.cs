using Microsoft.EntityFrameworkCore;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;

namespace TodoList.Application.Services;

public class TodoService : ITodoService
{
    private readonly IDbContext _dbContext;

    public TodoService(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result<Todo>> CreateAsync(Guid userId, string title, string? description = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<Todo>.Error(ErrorCode.UserIdNotValid);
        }

        if(!await _dbContext.Users.AnyAsync(user => user.Id.Equals(userId)))
        {
            return Result<Todo>.Error(ErrorCode.UserNotFound);
        }
        
        if (string.IsNullOrEmpty(title))
        {
            return Result<Todo>.Error(ErrorCode.TitleMustNotBeEmpty);
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

        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            return Result<Todo>.Error(ErrorCode.TodoNotSavedToDatabase);
        }

        return Result<Todo>.Success(newTodo);
    }
}