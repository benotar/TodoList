using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Services;
using TodoList.WebApi.Infrastructure.Extensions;
using TodoList.WebApi.Models.Todos;

namespace TodoList.WebApi.Controllers;

/// <summary>
/// Controller for managing todos, including operations such as retrieving, creating, updating, and deleting todos.
/// All actions require the user to be authenticated.
/// </summary>
[Authorize]
public class TodoController : BaseController
{
    private readonly ITodoService _todoService;

    /// <summary>
    /// Initializes a new instance of the <see cref="TodoController"/> class.
    /// </summary>
    /// <param name="todoService">The service used for managing todos.</param>
    public TodoController(ITodoService todoService) => _todoService = todoService;

    /// <summary>
    /// Retrieves a todo item by its ID.
    /// </summary>
    /// <param name="requestModel">The request model containing the unique identifier of the todo item.</param>
    /// <response code="200">Todo item retrieved successfully.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <response code="422">Unprocessable entity. Validation errors, such as invalid todo ID.</response>
    /// <returns>The requested todo item with user details.</returns>
    /// <remarks>
    ///
    /// **Example Request:**
    /// 
    /// GET http://localhost:5000/todo/get-by-id
    ///
    /// ```json
    /// {
    ///    "todoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    /// }
    /// ```
    /// 
    /// **Example Response:**
    /// 
    /// ```json
    /// {
    ///   "data": {
    ///     "todoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///     "userId": "3fa85f34-5717-4562-b3fc-2c963f66afa6",
    ///     "title": "Example title",
    ///     "isCompleted": true
    ///   },
    ///   "errorCode": null,
    ///   "isSucceed": true
    /// }
    /// ```
    /// </remarks>
    [HttpGet("get-by-id")]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<GetTodoByIdResponseModel>> GetById([FromBody]GetTodoByIdRequestModel requestModel)
    {
        var todoResult = await _todoService.GetByIdAsync(requestModel.TodoId, UserId);

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

    /// <summary>
    /// Retrieves all todo items for the current user.
    /// </summary>
    /// <response code="200">List of todo items retrieved successfully.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <returns>A list of todo items for the authenticated user.</returns>
    /// <remarks>
    ///
    /// **Example Request:**
    /// 
    /// GET http://localhost:5000/todo/get-todos
    /// 
    /// **Example Response:**
    /// 
    /// ```json
    /// {
    ///   "data": [
    ///     {
    ///       "todoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///       "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///       "title": "Buy groceries",
    ///       "isCompleted": false
    ///     },
    ///     {
    ///       "todoId": "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    ///       "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///       "title": "Clean the house",
    ///       "isCompleted": true
    ///     }
    ///   ],
    ///   "errorCode": null,
    ///   "isSucceed": true
    /// }
    /// ```
    /// </remarks>
    [HttpGet("get-todos")]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
    public async Task<Result<IEnumerable<GetTodoByIdResponseModel>>> GetTodosById()
    {
        var todoResult = await _todoService.GetTodosByUserIdAsync(UserId);

        if (!todoResult.IsSucceed)
        {
            return todoResult.ErrorCode!;
        }

        var todos = todoResult.Data;

        var result = todos.Select(todo => todo.ToModel()).ToList();

        return result;
    }

    /// <summary>
    /// Creates a new todo item.
    /// </summary>
    /// <param name="request">The request model containing the details of the todo item.</param>
    /// <response code="200">Todo item created successfully.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <response code="422">Unprocessable entity. Validation errors such as missing required fields.</response>
    /// <returns>Result indicating the success or failure of the operation.</returns>
    /// <remarks>
    /// 
    /// **Example Request:**
    /// 
    /// GET http://localhost:5000/todo/create
    /// 
    /// ```json
    /// {
    ///   "title": "Example Title",
    ///   "csCompleted": true
    /// }
    /// ```
    /// </remarks>
    [HttpPost("create")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> CreateTodo([FromBody] CreateTodoRequestModel request)
    {
        var createTodoResult = await _todoService.CreateAsync(UserId, request.Title,
            request.IsCompleted);

        return createTodoResult.IsSucceed ? Result<None>.Success() : createTodoResult.ErrorCode;
    }

    /// <summary>
    /// Updates an existing todo item.
    /// </summary>
    /// <param name="request">The request model containing the updated details of the todo item.</param>
    /// <response code="200">Todo item updated successfully.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <response code="422">Unprocessable entity. Validation errors such as missing required fields.</response>
    /// <returns>Result indicating the success or failure of the operation.</returns>
    /// <remarks>
    /// **Example Request:**
    /// 
    /// PUT http://localhost:5000/todo/update
    /// 
    /// ```json
    /// {
    ///   "todoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///   "title": "Updated Title",
    ///   "isCompleted": true
    /// }
    /// ```
    /// </remarks>
    [HttpPut("update")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> Update([FromBody] UpdateTodoRequestModel request)
    {
        var updateTodoResult = await _todoService.UpdateAsync(request.TodoId, UserId,
            request.Title, request.IsCompleted);

        return updateTodoResult.IsSucceed ? Result<None>.Success() : updateTodoResult.ErrorCode;
    }

    /// <summary>
    /// Deletes a todo item by its ID.
    /// </summary>
    /// <param name="request">The request model containing the ID of the todo item to be deleted.</param>
    /// <response code="200">Todo item deleted successfully.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <response code="422">Unprocessable entity. Validation errors such as invalid todo ID.</response>
    /// <returns>Result indicating the success or failure of the operation.</returns>
    /// <remarks>
    /// **Example Request:**
    /// 
    /// DELETE http://localhost:5000/todo/delete
    /// 
    /// ```json
    /// {
    ///   "todoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    /// }
    /// ```
    /// </remarks>
    [HttpDelete("delete")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> Delete([FromBody] DeleteTodoRequestModel request)
    {
        var deleteTodoResult = await _todoService.DeleteAsync(request.TodoId, UserId);

        return deleteTodoResult.IsSucceed ? Result<None>.Success() : deleteTodoResult.ErrorCode;
    }

    /// <summary>
    /// Toggles the completion status of a todo item.
    /// </summary>
    /// <param name="request">The request model containing the ID of the todo item to toggle.</param>
    /// <response code="200">Todo item completion status toggled successfully.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <response code="422">Unprocessable entity. Validation errors such as invalid todo ID.</response>
    /// <returns>Result indicating the success or failure of the operation.</returns>
    /// <remarks>
    /// **Example Request:**
    /// 
    /// PUT http://localhost:5000/todo/toggle
    /// 
    /// ```json
    /// {
    ///   "todoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    /// }
    /// ```
    /// </remarks>
    [HttpPut("toggle")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> Update([FromBody] ToggleIsCompletedRequestModel request)
    {
        var updateTodoResult = await _todoService.ToggleIsCompleted(request.TodoId, UserId);

        return updateTodoResult.IsSucceed ? Result<None>.Success() : updateTodoResult.ErrorCode;
    }
}