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

    [HttpGet("get")]
    [ProducesResponseType(typeof(Result<IEnumerable<Todo>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<IEnumerable<Todo>>), StatusCodes.Status400BadRequest)]
    public async Task<Result<IEnumerable<Todo>>> Get()
        => await _todoService.GetAsync();

    [HttpGet("get/{title}")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status400BadRequest)]
    public async Task<Result<Todo>> Get(string title)
        => await _todoService.GetByTitleAsync(title);

    [HttpGet("get/{todoId:guid}")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status400BadRequest)]
    public async Task<Result<Todo>> Get(Guid todoId)
        => await _todoService.GetByIdAsync(todoId);

    [HttpPost("create")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status400BadRequest)]
    public async Task<Result<Todo>> CreateTodo(CreateTodoModel createTodoModel)
        => await _todoService.CreateAsync(GetUserId(), createTodoModel.Title, createTodoModel.Description);

    [HttpPut("update/{todoId:guid}")]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<Todo>), StatusCodes.Status400BadRequest)]
    public async Task<Result<Todo>> Update(Guid todoId, UpdateTodoModel updateTodoModel)
        => await _todoService.UpdateAsync(todoId, updateTodoModel.Title, updateTodoModel.Description);

    [HttpDelete("delete/{todoId:guid}")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status400BadRequest)]
    public async Task<Result<None>> Update(Guid todoId)
        => await _todoService.DeleteAsync(todoId);
}