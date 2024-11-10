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

/// <summary>
/// Provides administrative endpoints for managing users and todos with advanced access rights.
/// Requires authentication and specific permissions to access these features.
/// </summary>
[Authorize]
[PermissionAuthorize]
public class AdminController : BaseController
{
    private readonly IUserService _userService;

    private readonly ITodoService _todoService;

    private const Permission AdminPermission = Permission.Advanced;

    /// <summary>
    /// Initializes a new instance of the <see cref="AdminController"/> class with services for user and todo management.
    /// </summary>
    /// <param name="userService">Service for user operations.</param>
    /// <param name="todoService">Service for todo operations.</param>
    public AdminController(IUserService userService, ITodoService todoService)
    {
        _userService = userService;

        _todoService = todoService;
    }

    #region Users

    /// <summary>
    /// Registers a new administrator in the system.
    /// </summary>
    /// <param name="requestModel">Registration details, including username, password, and name.</param>
    /// <response code="200">The administrator was successfully registered.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <response code="422">Validation error. The provided data is invalid or incomplete.</response>
    /// <response code="403">Forbidden. The user lacks the required permissions.</response>
    /// <returns>An empty result indicating the outcome of the operation.</returns>
    /// <remarks>
    /// **Example Request:**
    /// 
    /// POST http://localhost:5000/admin/create-admin
    /// 
    /// ```json
    /// {
    ///   "userName": "adminUser",
    ///   "password": "securePassword",
    ///   "name": "Admin"
    /// }
    /// ```
    /// </remarks>
    [HttpPost("create-admin")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    [ProducesResponseType(typeof(Result<ProblemDetails>), StatusCodes.Status403Forbidden)]
    public async Task<Result<None>> RegisterAdmin([FromBody] RegisterRequestModel requestModel)
    {
        return await _userService.CreateAsync(requestModel.UserName,
            requestModel.Password, requestModel.Name, AdminPermission);
    }

    /// <summary>
    /// Retrieves a list of all users along with their associated todos.
    /// </summary>
    /// <response code="200">Request was successful. Returns a list of users with their todos.</response>
    /// <response code="401">Unauthorized request. The user is not authenticated to access this endpoint.</response>
    /// <response code="403">Forbidden. The user does not have the required permissions.</response>
    /// <returns>A list of users with their todos.</returns>
    /// <remarks>
    ///
    /// **Example Request:**
    /// 
    /// GET http://localhost:5000/admin/get-users
    /// 
    /// **Example Response:**
    ///
    /// ```json
    /// {
    ///   "data": [
    ///     {
    ///       "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///       "userName": "johndoe",
    ///       "passwordSalt": "4fAXC63a/mutOBiMDT1DiCbwrI+Z2DyYQdw4eT4eG0TufNPmHM5c7oxS2xKxdDJ5vDf3btyoF4RjShKx5sWcyw==",
    ///       "passwordHash": "Ln0nm8iCkdHVVpHKzVb6FP+p3s/qtK27prU8Qq9Vi0U=",
    ///       "name": "John Doe",
    ///       "permission": "Advanced",
    ///       "createdAt": "2024-11-10T16:45:18.903Z",
    ///       "updatedAt": "2024-11-10T16:45:18.903Z",
    ///       "todos": [
    ///         {
    ///           "todoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///           "title": "Buy groceries",
    ///           "isCompleted": true,
    ///           "createdAt": "2024-11-10T16:45:18.903Z",
    ///           "updatedAt": "2024-11-10T16:45:18.903Z"
    ///         }
    ///       ]
    ///     }
    ///   ],
    ///   "errorCode": null,
    ///   "isSucceed": true
    /// }
    /// ```
    /// </remarks>
    [HttpGet("get-users")]
    [ProducesResponseType(typeof(Result<IEnumerable<GetUsersFullInfoResponseModel>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
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

    /// <summary>
    /// Updates an existing user's information.
    /// </summary>
    /// <param name="requestModel">Update details, including user ID, username, and name.</param>
    /// <response code="200">User successfully updated.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <response code="422">Validation error. The provided data is invalid or incomplete.</response>
    /// <response code="403">Forbidden. The user lacks the required permissions.</response>
    /// <returns>An empty result indicating the outcome of the operation.</returns>
    /// <remarks>
    /// 
    /// **Example Request:**
    /// 
    /// POST http://localhost:5000/admin/update-user
    /// 
    /// ```json
    /// {
    ///   "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///   "userName": "newUserName",
    ///   "name": "Updated Name"
    /// }
    /// ```
    /// </remarks>
    [HttpPost("update-user")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<ProblemDetails>), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> UpdateUser([FromBody] UpdateUserRequestModel requestModel)
    {
        return await _userService.UpdateAsync(requestModel.UserId, requestModel.UserName, requestModel.Name);
    }

    /// <summary>
    /// Updates the permissions for an existing user.
    /// </summary>
    /// <param name="requestModel">Update details, including user ID and permission level.</param>
    /// <response code="200">Permissions successfully updated.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <response code="422">Validation error. The provided data is invalid or incomplete.</response>
    /// <response code="403">Forbidden. The user lacks the required permissions.</response>
    /// <returns>An empty result indicating the outcome of the operation.</returns>
    /// <remarks>
    /// 
    /// **Example Request:**
    /// 
    /// POST http://localhost:5000/admin/update-permission
    /// 
    /// ```json
    /// {
    ///   "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///   "permission": "Basic"
    /// }
    /// ```
    /// </remarks>
    [HttpPost("update-permission")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<ProblemDetails>), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> UpdatePermission([FromBody] UpdatePermissionRequestModel requestModel)
    {
        return await _userService.UpdatePermissionAsync(requestModel.UserId, requestModel.Permission);
    }

    /// <summary>
    /// Deletes a specified user from the system.
    /// </summary>
    /// <param name="requestModel">Details for the user to be deleted, including the user ID.</param>
    /// <response code="200">User successfully deleted.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <response code="422">Validation error. The provided data is invalid or incomplete.</response>
    /// <response code="403">Forbidden. The user lacks the required permissions.</response>
    /// <returns>An empty result indicating the outcome of the operation.</returns>
    /// <remarks>
    /// 
    /// **Example Request:**
    /// 
    /// DELETE http://localhost:5000/admin/delete-user
    /// 
    /// ```json
    /// {
    ///    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    /// }
    /// ```
    /// </remarks>
    [HttpDelete("delete-user")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<ProblemDetails>), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> DeleteUserById([FromBody] DeleteUserByIdRequestModel requestModel)
    {
        return await _userService.DeleteByIdAsync(requestModel.UserId);
    }

    /// <summary>
    /// Deletes all basic users from the system.
    /// </summary>
    /// <response code="200">The users were successfully deleted.</response>
    /// <response code="401">Unauthorized request. The user is not authenticated to access this endpoint.</response>
    /// <response code="403">Forbidden. The user does not have the required permissions to perform this operation.</response>
    /// <returns>An empty result indicating the outcome of the operation.</returns>
    /// <remarks>
    ///
    /// **Example Request:**
    /// 
    /// DELETE http://localhost:5000/admin/delete-users
    /// 
    /// **Example Response:**
    ///
    /// ```json
    /// {
    ///   "data": null,
    ///   "errorCode": null,
    ///   "isSucceed": true
    /// }
    /// ```
    /// </remarks>
    [HttpDelete("delete-users")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<ProblemDetails>), StatusCodes.Status403Forbidden)]
    public async Task<Result<None>> RemoveUsers()
    {
        return await _userService.DeleteBasicUsersAsync();
    }

    #endregion

    #region Todos

    /// <summary>
    /// Retrieves all todos with user details.
    /// </summary>
    /// <response code="200">Todos retrieved successfully.</response>
    /// <response code="401">Unauthorized. The user is not authenticated.</response>
    /// <response code="403">Forbidden. The user lacks the required permissions.</response>
    /// <returns>A list of todos with associated user details.</returns>
    /// <remarks>
    ///
    /// **Example Request:**
    /// 
    /// GET http://localhost:5000/admin/get-todos
    /// 
    /// Example Response:
    /// 
    /// ```json
    /// {
    ///   "data": [
    ///     {
    ///       "todoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///       "user": {
    ///         "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ///         "userName": "string",
    ///         "passwordSalt": "string",
    ///         "passwordHash": "string",
    ///         "name": "string",
    ///         "permission": "Advanced",
    ///         "createdAt": "2024-11-10T16:54:10.559Z",
    ///         "updatedAt": "2024-11-10T16:54:10.559Z"
    ///       },
    ///       "title": "string",
    ///       "isCompleted": true,
    ///       "createdAt": "2024-11-10T16:54:10.559Z",
    ///       "updatedAt": "2024-11-10T16:54:10.559Z"
    ///     }
    ///   ],
    ///   "errorCode": "User Not Found",
    ///   "isSucceed": true
    /// }
    /// ```
    /// </remarks>
    [HttpGet("get-todos")]
    [ProducesResponseType(typeof(Result<IEnumerable<GetFullInfoTodosResponseModel>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
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

    /// <summary>
    /// Delete all todos.
    /// </summary>
    /// <response code="200">Successfully request. All todos have been deleted.</response>
    /// <response code="401">Unauthorized request. The user is not authenticated to access this endpoint.</response>
    /// <response code="403">Forbidden. The user does not have the required permissions.</response>
    /// <returns>An empty result indicating the outcome of the operation.</returns>
    /// <remarks>
    ///
    /// **Example Request:**
    /// 
    /// DELETE http://localhost:5000/admin/delete-todos
    /// 
    /// **Example Response:**
    ///
    /// ```json
    /// {
    ///   "data": null,
    ///   "errorCode": null,
    ///   "isSucceed": true
    /// }
    /// ```
    /// </remarks>
    [HttpDelete("delete-todos")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<GetTodoByIdResponseModel>), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(Result<ProblemDetails>), StatusCodes.Status403Forbidden)]
    public async Task<Result<None>> RemoveTodos()
    {
        return await _todoService.DeleteAll();
    }

    #endregion
}