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
        return await _todoService.GetAsync();
    }

    [HttpGet("get/{title}")]
    public async Task<Result<Todo>> Get(string title)
        => await _todoService.GetByTitleAsync(title);


    [HttpGet("get/{todoId:guid}")]
    public async Task<Result<Todo>> Get(Guid todoId)
        => await _todoService.GetByIdAsync(todoId);

    [HttpPost("create")]
    public async Task<Result<Todo>> CreateTodo(CreateTodoModel createTodoModel)
        => await _todoService.CreateAsync(GetUserId(), createTodoModel.Title);


    [HttpPut("update/{todoId:guid}")]
    public async Task<Result<Todo>> Update(Guid todoId, UpdateTodoModel updateTodoModel)
        => await _todoService.UpdateAsync(todoId, updateTodoModel.Title, updateTodoModel.Description);

    [HttpDelete("delete/{todoId:guid}")]
    public async Task<Result<None>> Update(Guid todoId)
        => await _todoService.DeleteAsync(todoId);
}