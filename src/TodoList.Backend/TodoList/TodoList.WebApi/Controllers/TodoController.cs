using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Services;
using TodoList.WebApi.Infrastructure.Extensions;
using TodoList.WebApi.Models.Todos;

namespace TodoList.WebApi.Controllers;

[Authorize]
public class TodoController : BaseController
{
    private readonly ITodoService _todoService;

    public TodoController(ITodoService todoService) => _todoService = todoService;

    [HttpGet("get/{todoId:guid}")]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
    public async Task<Result<GetTodoByIdResponseModel>> GetById(Guid todoId)
    {
        var todoResult = await _todoService.GetByIdAsync(todoId, GetUserId());

        if (!todoResult.IsSucceed)
        {
            return todoResult.ErrorCode!;
        }

        var todo = todoResult.Data;

        return new GetTodoByIdResponseModel(
            todo.TodoId,
            todo.UserId,
            todo.Title,
            todo.IsCompleted
        );
    }

    [HttpGet("get-todos")]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
    public async Task<Result<IEnumerable<GetTodoByIdResponseModel>>> GetTodosById()
    {
        var todoResult = await _todoService.GetTodosByUserIdAsync(GetUserId());

        if (!todoResult.IsSucceed)
        {
            return todoResult.ErrorCode!;
        }

        var todos = todoResult.Data;

        var result = todos.Select(todo => todo.ToModel()).ToList();

        return result;
    }

    [HttpPost("create")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> CreateTodo([FromBody] CreateTodoRequestModel request)
    {
        var createTodoResult = await _todoService.CreateAsync(GetUserId(), request.Title,
            request.IsCompleted);

        return createTodoResult.IsSucceed ? Result<None>.Success() : createTodoResult.ErrorCode;
    }

    [HttpPut("update")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> Update([FromBody] UpdateTodoRequestModel request)
    {
        var updateTodoResult = await _todoService.UpdateAsync(request.TodoId, GetUserId(),
            request.Title, request.IsCompleted);

        return updateTodoResult.IsSucceed ? Result<None>.Success() : updateTodoResult.ErrorCode;
    }

    [HttpDelete("delete")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> Delete([FromBody] DeleteTodoRequestModel request)
    {
        var deleteTodoResult = await _todoService.DeleteAsync(request.TodoId, GetUserId());

        return deleteTodoResult.IsSucceed ? Result<None>.Success() : deleteTodoResult.ErrorCode;
    }

    [HttpPut("toggle")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> Update([FromBody] ToggleIsCompletedRequestModel request)
    {
        var updateTodoResult = await _todoService.ToggleIsCompleted(request.TodoId, GetUserId());

        return updateTodoResult.IsSucceed ? Result<None>.Success() : updateTodoResult.ErrorCode;
    }
}