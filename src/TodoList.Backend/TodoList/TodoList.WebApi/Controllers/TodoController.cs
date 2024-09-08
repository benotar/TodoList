using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Todos;

namespace TodoList.WebApi.Controllers;

[Authorize]
public class TodoController : BaseController
{
    private readonly ITodoService _todoService;

    public TodoController(ITodoService todoService) => _todoService = todoService;

    [HttpGet("get/{title}")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status403Forbidden)]
    public async Task<Result<Todo>> Get(string title)
    {
        var getTodoByTitleResult = await _todoService.GetByTitleAsync(title);

        return getTodoByTitleResult.Data.UserId.Equals(GetUserId())
            ? getTodoByTitleResult
            : Result<Todo>.Error(ErrorCode.AccessDenied);
    }

    [HttpGet("get/{todoId:guid}")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status403Forbidden)]
    public async Task<Result<Todo>> Get(Guid todoId)
    {
        var getTodoByIdResult = await _todoService.GetByIdAsync(todoId);

        return getTodoByIdResult.Data.UserId.Equals(GetUserId())
            ? getTodoByIdResult
            : Result<Todo>.Error(ErrorCode.AccessDenied);
    }

    [HttpPost("create")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status400BadRequest)]
    public async Task<Result<Todo>> CreateTodo(CreateTodoModel createTodoModel)
        => await _todoService.CreateAsync(GetUserId(), createTodoModel.Title, createTodoModel.Description);


    [HttpPut("update/{todoId:guid}")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status403Forbidden)]
    public async Task<Result<Todo>> Update(Guid todoId, UpdateTodoModel updateTodoModel)
    {
        var updateTodoResult =
            await _todoService.UpdateAsync(todoId, updateTodoModel.Title, updateTodoModel.Description);

        return updateTodoResult.Data.UserId.Equals(GetUserId())
            ? updateTodoResult
            : Result<Todo>.Error(ErrorCode.AccessDenied);
    }

    // [HttpDelete("delete/{todoId:guid}")]
    // [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    // [ProducesResponseType(typeof(Result<None>), StatusCodes.Status400BadRequest)]
    // public async Task<Result<None>> Update(Guid todoId)
    // {
    //     if(_todoService.)
    // }
}