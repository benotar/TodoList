using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Enums;
using TodoList.WebApi.Infrastructure.Extensions;
using TodoList.WebApi.Models.Authentication;
using TodoList.WebApi.Models.Todos;
using TodoList.WebApi.Models.Users;

namespace TodoList.WebApi.Controllers;

// Admin controller
[Authorize]
[PermissionAuthorize]
public class AdminController : BaseController
{
    private readonly IUserService _userService;

    private readonly ITodoService _todoService;

    private const Permission AdminPermission = Permission.Advanced;

    public AdminController(IUserService userService, ITodoService todoService)
    {
        _userService = userService;

        _todoService = todoService;
    }


    [HttpPost("create-admin")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    [ProducesResponseType(typeof(Result<ProblemDetails>), StatusCodes.Status403Forbidden)]
    public async Task<Result<None>> RegisterAdmin([FromBody] RegisterRequestModel registerRequestModel)
    {
        var createUserResult = await _userService.CreateAsync(registerRequestModel.Username,
            registerRequestModel.Password, registerRequestModel.Name, AdminPermission);

        return createUserResult.IsSucceed ? createUserResult : createUserResult.ErrorCode;
    }


    [HttpGet("get-users")]
    [ProducesResponseType(typeof(Result<IEnumerable<GetUsersFullInfoResponseModel>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<ProblemDetails>), StatusCodes.Status403Forbidden)]
    public async Task<Result<IEnumerable<GetUsersFullInfoResponseModel>>> GetUsers()
    {
        var requestResult = await _userService.GetUsersFullInfoAsync();

        if (!requestResult.Data.Any())
        {
            return new List<GetUsersFullInfoResponseModel>();
        }

        var users = requestResult.Data
            .Select(user =>
                user.ToModel())
            .ToList();

        return users;
    }

    [HttpGet("get-todos")]
    [ProducesResponseType(typeof(Result<IEnumerable<GetFullInfoTodosResponseModel>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<ProblemDetails>), StatusCodes.Status403Forbidden)]
    public async Task<Result<IEnumerable<GetFullInfoTodosResponseModel>>> GetTodos()
    {
        var requestResult = await _todoService.GetTodosAsync();

        if (!requestResult.Data.Any())
        {
            return new List<GetFullInfoTodosResponseModel>();
        }

        var todos = requestResult.Data
            .Select(todo =>
                todo.ToModel())
            .ToList();

        return todos;
    }
}