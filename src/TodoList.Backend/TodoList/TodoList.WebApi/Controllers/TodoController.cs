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

    public TodoController(ITodoService todoService) => _todoService = todoService;

    [HttpGet("get/title/{title}")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status404NotFound)]
    public async Task<Result<Todo>> Get(string title)
        => await _todoService.GetByTitleAsync(title, GetUserId());

    [HttpGet("get/{todoId:guid}")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status404NotFound)]
    public async Task<Result<Todo>> Get(Guid todoId)
        => await _todoService.GetByIdAsync(todoId, GetUserId());

    [HttpPost("create")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status401Unauthorized)]
    public async Task<Result<Todo>> CreateTodo([FromBody] CreateTodoModel createTodoModel)
    {
        return await _todoService.CreateAsync(GetUserId(), createTodoModel.Title, createTodoModel.Description);
    }


    [HttpPut("update/{todoId:guid}")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status404NotFound)]
    public async Task<Result<Todo>> Update(Guid todoId, UpdateTodoModel updateTodoModel)
        => await _todoService.UpdateAsync(todoId, GetUserId(),
            updateTodoModel.Title, updateTodoModel.Description);

    [HttpDelete("delete/{todoId:guid}")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status404NotFound)]
    public async Task<Result<None>> Delete(Guid todoId)
        => await _todoService.DeleteAsync(todoId, GetUserId());
}