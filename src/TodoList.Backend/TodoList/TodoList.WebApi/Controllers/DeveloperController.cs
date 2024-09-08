using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;


namespace TodoList.WebApi.Controllers;

// Testing controller

[ApiController]
[Route("[controller]")]
public class DeveloperController : ControllerBase
{
    // for testing
    private readonly IUserService _userService;

    private readonly ITodoService _todoService;

    public DeveloperController(IUserService userService, ITodoService todoService)
    {
        _userService = userService;
        
        _todoService = todoService;
    }

    [HttpGet("get-users")]
    [ProducesResponseType(typeof(Result<IEnumerable<User>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<IEnumerable<User>>), StatusCodes.Status400BadRequest)]
    public async Task<Result<IEnumerable<User>>> GetUsers()
        => await _userService.GetUsersAsync();
    
    [HttpGet("get-todos")]
    [ProducesResponseType(typeof(Result<IEnumerable<Todo>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<IEnumerable<Todo>>), StatusCodes.Status400BadRequest)]
    public async Task<Result<IEnumerable<Todo>>> GetTodos()
        => await _todoService.GetAsync();
}