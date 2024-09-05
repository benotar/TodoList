using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;


namespace TodoList.WebApi.Controllers;

// Testing controller

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    // for testing
    private readonly IUserService _userService;


    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("get")]
    public async Task<ActionResult<Result<IEnumerable<User>>>> Get()
    {
        var usersResult = await _userService.GetUsersAsync();

        return usersResult.IsSucceed
            ? Ok(Result<IEnumerable<User>>.Success(usersResult.Data))
            : BadRequest(Result<None>.Error(usersResult.ErrorCode));
    }
}