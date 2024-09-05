using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Services;
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

    [HttpPost("create")]
    public async Task<Result<None>> CreateTodo(CreateTodoModel createTodoModel)
    {
        var currentUserId = GetUserId();

        var createTodoResult = await _todoService.CreateAsync(currentUserId, createTodoModel.Title);

        return createTodoResult.IsSucceed
            ? Result<None>.Success()
            : Result<None>.Error(createTodoResult.ErrorCode);
    }
}

    