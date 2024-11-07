using Microsoft.EntityFrameworkCore;
using TodoList.Application.Common;
using TodoList.Application.DTOs;
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

    private readonly IUserService _userService;

    public TodoService(IDbContext dbContext, IDateTimeProvider dateTimeProvider, IUserService userService)
    {
        _dbContext = dbContext;

        _dateTimeProvider = dateTimeProvider;

        _userService = userService;
    }

    public async Task<Result<IEnumerable<TodoWithUserDto>>> GetTodosAsync()
    {
        // Get todos
        var todos = await _dbContext.Todos
            .Include(todo => todo.User)
            .ToListAsync();

        var todosDto = todos.Select(todo => todo.ToTodoWithoutUser()).ToList();
        
        // Return success result
        return todosDto;
    }

    public async Task<Result<IEnumerable<TodoDto>>> GetTodosByUserIdAsync(Guid userId)
    {
        // Check if the user exists
        if (!await _userService.IsUserExistByIdAsync(userId))
        {
            return ErrorCode.UserNotFound;
        }

        // Get todos
        var todos = await _dbContext.Todos
            .Where(todo => todo.UserId == userId)
            .Select(todo => todo.ToDto())
            .ToListAsync();

        // Return success result
        return todos;
    }

    public async Task<Result<TodoDto>> GetByIdAsync(Guid todoId, Guid userId)
    {
        // Check if the user exists
        if (!await _userService.IsUserExistByIdAsync(userId))
        {
            return ErrorCode.UserNotFound;
        }

        // Get todo
        var todo = await _dbContext.Todos
            .Where(todo => todo.Id == todoId && todo.UserId == userId)
            .Select(todo => todo.ToDto())
            .FirstOrDefaultAsync();

        // Check if the todo exists
        if (todo is null)
        {
            return ErrorCode.TodoNotFound;
        }

        // Return success result
        return todo;
    }

    public async Task<Result<None>> CreateAsync(Guid userId, string title, bool? isCompleted)
    {
        // Check if the user exists
        if (!await _userService.IsUserExistByIdAsync(userId))
        {
            return ErrorCode.UserNotFound;
        }
        
        // Check if the todo already exists
        if (await _dbContext.Todos.AnyAsync(todo => todo.Title == title && todo.UserId == userId))
        {
            return ErrorCode.TodoAlreadyExists;
        }

        // Check if the title is not empty
        if (string.IsNullOrEmpty(title))
        {
            return ErrorCode.TodoTitleMustNotBeEmpty;
        }
        
        // Create new todo
        var newTodo = new Todo
        {
            UserId = userId,
            Title = title,
            IsCompleted = isCompleted
        };

        // Add new todo to database
        await _dbContext.Todos.AddAsync(newTodo);

        // Save changes
        await _dbContext.SaveChangesAsync();

        // Return success result
        return Result<None>.Success();
    }

    public async Task<Result<None>> UpdateAsync(Guid todoId, Guid userId, string newTitle, bool newIsCompleted)
    {
        // Check if the user exists
        if (!await _userService.IsUserExistByIdAsync(userId))
        {
            return ErrorCode.UserNotFound;
        }
        
        // Get todo to update, as tracking
        var existingTodo = await _dbContext.Todos
            .AsTracking()
            .FirstOrDefaultAsync(todo => todo.Id == todoId && todo.UserId == userId);
        
        // Check if todo exists
        if (existingTodo is null)
        {
            return ErrorCode.TodoNotFound;
        }

        // Check if data is same
        if (string.Equals(newTitle, existingTodo.Title, StringComparison.OrdinalIgnoreCase)
            && newIsCompleted == existingTodo.IsCompleted)
        {
            return ErrorCode.TodoDataIsTheSame;
        }

        // Update todo
        existingTodo.Title = newTitle;
        existingTodo.IsCompleted = newIsCompleted;
        existingTodo.UpdatedAt = _dateTimeProvider.UtcNow;

        // Save changes
        await _dbContext.SaveChangesAsync();

        // Return success result
        return Result<None>.Success();
    }

    public async Task<Result<None>> DeleteAsync(Guid todoId, Guid userId)
    {
        // Check if the user exists
        if (!await _userService.IsUserExistByIdAsync(userId))
        {
            return ErrorCode.UserNotFound;
        }
        
        // Get todo to update, as tracking
        var existingTodo = await _dbContext.Todos
            .FirstOrDefaultAsync(todo => todo.Id == todoId && todo.UserId == userId);
        
        // Check if todo exists
        if (existingTodo is null)
        {
            return ErrorCode.TodoNotFound;
        }

        // Remove todo
        _dbContext.Todos.Remove(existingTodo);

        // Save changes
        await _dbContext.SaveChangesAsync();

        // Return success result
        return Result<None>.Success();
    }

    public async Task<Result<None>> ToggleIsCompleted(Guid todoId, Guid userId)
    {
        // Check if the user exists
        if (!await _userService.IsUserExistByIdAsync(userId))
        {
            return ErrorCode.UserNotFound;
        }
        
        // Get todo to update, as tracking
        var existingTodo = await _dbContext.Todos
            .AsTracking()
            .FirstOrDefaultAsync(todo => todo.Id == todoId && todo.UserId == userId);
        
        // Check if todo exists
        if (existingTodo is null)
        {
            return ErrorCode.TodoNotFound;
        }

        // Toggle is completed
        existingTodo.IsCompleted = !existingTodo.IsCompleted;
        existingTodo.UpdatedAt = _dateTimeProvider.UtcNow;

        // Save changes
        await _dbContext.SaveChangesAsync();

        // Return success result
        return Result<None>.Success();
    }
}