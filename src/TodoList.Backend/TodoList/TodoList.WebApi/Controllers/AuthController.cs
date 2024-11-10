using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Authentication;

namespace TodoList.WebApi.Controllers;

/// <summary>
/// Controller that handles authentication operations, including user registration, login, and logout.
/// Handles access and refresh tokens, as well as user sessions.
/// </summary>
public class AuthController : BaseController
{
    private readonly IUserService _userService;
    private readonly IRefreshTokenSessionService _refreshTokenSessionService;
    private readonly IJwtProvider _jwtProvider;
    private readonly ICookieProvider _cookieProvider;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthController"/> class.
    /// </summary>
    /// <param name="userService">The user service for handling user-related operations.</param>
    /// <param name="refreshTokenSessionService">The service for managing refresh token sessions.</param>
    /// <param name="jwtProvider">The provider for generating and validating JWT tokens.</param>
    /// <param name="cookieProvider">The provider for managing cookies related to authentication.</param>
    public AuthController(IUserService userService, IRefreshTokenSessionService refreshTokenSessionService,
        IJwtProvider jwtProvider, ICookieProvider cookieProvider)
    {
        _userService = userService;
        _refreshTokenSessionService = refreshTokenSessionService;

        _jwtProvider = jwtProvider;
        _cookieProvider = cookieProvider;
    }
    
    /// <summary>
    /// Registers a new user in the system.
    /// </summary>
    /// <param name="registerRequestModel">The registration request model containing user data.</param>
    /// <response code="200">User successfully registered.</response>
    /// <response code="422">Validation error. The provided data is incorrect or incomplete.</response>
    /// <returns>A result indicating the outcome of the registration process.</returns>
    /// <remarks>
    /// 
    /// **Example Request:**
    /// 
    /// POST http://localhost:5000/auth/create-admin
    /// 
    /// ```json
    /// {
    ///   "userName": "renamedUser228",
    ///   "password": "Password2024",
    ///   "name": "Dobrunya"
    /// }
    /// ```
    /// </remarks>
    [HttpPost("register")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> Register([FromBody] RegisterRequestModel registerRequestModel)
    {
        const Permission permission = Permission.Basic;

        var createUserResult = await _userService.CreateAsync(registerRequestModel.UserName,
            registerRequestModel.Password, registerRequestModel.Name, permission);

        return createUserResult.IsSucceed ? createUserResult : createUserResult.ErrorCode;
    }

    /// <summary>
    /// Authenticates a user and returns an access token and a refresh token.
    /// </summary>
    /// <param name="registerRequestModel">The login request model containing user credentials.</param>
    /// <response code="200">Login successful. Tokens returned.</response>
    /// <response code="422">Validation error. The provided data is incorrect or incomplete.</response>
    /// <returns>The access token and refresh token for the authenticated user.</returns>
    /// <remarks>
    /// 
    /// **Example Request:**
    /// 
    /// POST http://localhost:5000/auth/create-admin
    /// 
    /// ```json
    /// {
    ///   "userName": "renamedUser228",
    ///   "password": "Password2024",
    ///   "fingerprint": "dasdasdwads"
    /// }
    /// ```
    /// </remarks>
    [HttpPost("login")]
    [ProducesResponseType(typeof(Result<LoginResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<LoginResponseModel>> Login([FromBody] LoginRequestModel registerRequestModel)
    {
        // Get existing user
        var existingUserResult =
            await _userService.GetByUserNameAndCheckPasswordAsync(registerRequestModel.UserName,
                registerRequestModel.Password);

        // Check if user exists
        if (!existingUserResult.IsSucceed)
        {
            return existingUserResult.ErrorCode;
        }

        var user = existingUserResult.Data;

        // Generate jwt tokens
        var accessToken = _jwtProvider.GenerateToken(user.UserId, JwtTokenType.Access, user.Permission);
        var refreshToken = _jwtProvider.GenerateToken(user.UserId, JwtTokenType.Refresh, user.Permission);

        // Create session
        await _refreshTokenSessionService.CreateOrUpdateAsync(user.UserId, registerRequestModel.Fingerprint,
            refreshToken);

        // Add refresh token and fingerprint to cookies
        _cookieProvider.AddRefreshTokenCookiesToResponse(HttpContext.Response, refreshToken);
        _cookieProvider.AddFingerprintCookiesToResponse(HttpContext.Response, registerRequestModel.Fingerprint);

        // Return result
        return new LoginResponseModel(accessToken);
    }
    
    /// <summary>
    /// Logs out the user and invalidates the refresh token session.
    /// </summary>
    /// <response code="200">Request successful. User is logged out and session is invalidated.</response>
    /// <returns>A result indicating the outcome of the logout operation.</returns>
    /// <remarks>
    ///
    /// **Example Request:**
    /// 
    /// POST http://localhost:5000/auth/logout
    /// 
    /// **Example Response:**
    ///
    /// ```json
    /// {
    ///   "data": {},
    ///   "errorCode": "User Not Found",
    ///   "isSucceed": false
    /// }
    /// ```
    /// </remarks>
    [HttpPost("logout")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    public async Task<Result<None>> Logout()
    {
        // Get refresh token from cookies
        var refreshToken = _cookieProvider.GetRefreshTokenFromCookies(HttpContext.Request);

        // Check if a refresh token exists
        if (refreshToken is null)
        {
            return ErrorCode.RefreshCookieNotFound;
        }

        // Check if the refresh token is valid
        if (!_jwtProvider.IsTokenValid(refreshToken, JwtTokenType.Refresh))
        {
            return ErrorCode.InvalidRefreshToken;
        }

        // Get fingerprint from cookies
        var fingerprint = _cookieProvider.GetFingerprintFromCookies(HttpContext.Request);

        // Check if a fingerprint exists
        if (string.IsNullOrEmpty(fingerprint))
        {
            return ErrorCode.FingerprintCookieNotFound;
        }

        // Get user id from refresh token
        var userId = _jwtProvider.GetUserDataFromRefreshToken(refreshToken).UserId;

        // Delete session
        await _refreshTokenSessionService.DeleteAsync(userId, fingerprint);

        // Delete cookies 
        _cookieProvider.DeleteCookiesFromResponse(HttpContext.Response);

        // Return result
        return Result<None>.Success();
    }
}