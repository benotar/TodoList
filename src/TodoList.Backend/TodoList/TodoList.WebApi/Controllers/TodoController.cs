using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;
using TodoList.WebApi.Models.Todos;

namespace TodoList.WebApi.Controllers;

[Authorize]
public class TodoController : BaseController
{
    private readonly ITodoService _todoService;

    public TodoController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet("get")]
    public async Task<Result<IEnumerable<Todo>>> Get()
    {
        var todosResult = await _todoService.GetAsync();

        return todosResult.IsSucceed
            ? Result<IEnumerable<Todo>>.Success(todosResult.Data)
            : Result<IEnumerable<Todo>>.Error(todosResult.ErrorCode);
    }

    [HttpGet("get/{title}")]
    public async Task<Result<Todo>> Get(string title)
    {
        var todoResult = await _todoService.GetByTitleAsync(title);

        return todoResult.IsSucceed
            ? Result<Todo>.Success(todoResult.Data)
            : Result<Todo>.Error(todoResult.ErrorCode);
    }
    
    [HttpGet("get/{todoId:guid}")]
    public async Task<Result<Todo>> Get(Guid todoId)
    {
        var todoResult = await _todoService.GetByIdAsync(todoId);

        return todoResult.IsSucceed
            ? Result<Todo>.Success(todoResult.Data)
            : Result<Todo>.Error(todoResult.ErrorCode);
    }
    
    [HttpPost("create")]
    public async Task<Result<None>> CreateTodo(CreateTodoModel createTodoModel)
    {
        var currentUserId = GetUserId();

        var createTodoResult = await _todoService.CreateAsync(currentUserId, createTodoModel.Title);

        return createTodoResult.IsSucceed
            ? Result<None>.Success()
            : Result<None>.Error(createTodoResult.ErrorCode);
    }

    [HttpPut("update/{todoId:guid}")]
    public async Task<Result<Todo>> Update(Guid todoId, UpdateTodoModel updateTodoModel)
    {
        var todoResult = await _todoService.UpdateAsync(todoId, updateTodoModel.Title, updateTodoModel.Description);

        return todoResult.IsSucceed
            ? Result<Todo>.Success(todoResult.Data)
            : Result<Todo>.Error(todoResult.ErrorCode);  
    }
    
    [HttpDelete("delete/{todoId:guid}")]
    public async Task<Result<None>> Update(Guid todoId)
    {
        var todoResult = await _todoService.DeleteAsync(todoId);

        return todoResult.IsSucceed
            ? Result<None>.Success()
            : Result<None>.Error(todoResult.ErrorCode);  
    }
    
}

    