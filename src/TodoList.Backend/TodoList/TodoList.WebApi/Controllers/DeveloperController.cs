using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Services;
using TodoList.WebApi.Models.Users;

namespace TodoList.WebApi.Controllers;

// Testing controller
public class DeveloperController : BaseController
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
    [ProducesResponseType(typeof(Result<IEnumerable<GetPresentationUsersResponseModel>>), StatusCodes.Status200OK)]
    public async Task<Result<IEnumerable<GetPresentationUsersResponseModel>>> GetUsers()
    {
        var requestResult = await _userService.GetPresentationAsync();

        var users = requestResult.Data.Select(user => new GetPresentationUsersResponseModel(
            user.UserId,
            user.UserName,
            user.Name
        )).ToList();

        return users;
    }

    [HttpGet("get-full-users")]
    [ProducesResponseType(typeof(Result<IEnumerable<GetUsersFullInfoResponseModel>>), StatusCodes.Status200OK)]
    public async Task<Result<IEnumerable<GetUsersFullInfoResponseModel>>> GetFullUsers()
    {
        var requestResult = await _userService.GetUsersFullInfoAsync();

        var users = requestResult.Data.Select(user => new GetUsersFullInfoResponseModel(
            user.UserId,
            user.UserName,
            user.PasswordSalt,
            user.PasswordHash,
            user.Name,
            user.Permission,
            user.CreatedAt,
            user.UpdatedAt
        )).ToList();

        return users;
    }

    // [HttpGet("get-todos")]
    // [ProducesResponseType(typeof(Result<IEnumerable<Todo>>), StatusCodes.Status200OK)]
    // public async Task<Result<IEnumerable<Todo>>> GetTodos() => await _todoService.GetAsync();
}