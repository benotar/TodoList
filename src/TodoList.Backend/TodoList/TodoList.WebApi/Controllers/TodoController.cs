using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;

namespace TodoList.WebApi.Controllers;

public class TodoController : BaseController
{
    private readonly ITodoService _todoService;
    private readonly IUserContextProvider _contextProvider;

    public TodoController(ITodoService todoService, IUserContextProvider contextProvider)
    {
        _todoService = todoService;

        _contextProvider = contextProvider;
    }

    // Todo TEST IT
    public async Task<IActionResult> CreateTodo()
    {
        var userId = _contextProvider.GetUserId();

        return Ok();
    }
}