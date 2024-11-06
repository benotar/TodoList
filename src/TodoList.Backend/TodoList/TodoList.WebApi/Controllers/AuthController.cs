using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Authentication;

namespace TodoList.WebApi.Controllers;

public class AuthController : BaseController
{
    private readonly IUserService _userService;
    private readonly IRefreshTokenSessionService _refreshTokenSessionService;

    private readonly IEncryptionProvider _encryptionProvider;
    private readonly IJwtProvider _jwtProvider;
    private readonly ICookieProvider _cookieProvider;

    public AuthController(IUserService userService, IRefreshTokenSessionService refreshTokenSessionService,
        IJwtProvider jwtProvider, ICookieProvider cookieProvider, IEncryptionProvider encryptionProvider)
    {
        _userService = userService;
        _refreshTokenSessionService = refreshTokenSessionService;

        _jwtProvider = jwtProvider;
        _cookieProvider = cookieProvider;
        _encryptionProvider = encryptionProvider;
    }

    [Authorize]
    [PermissionAuthorize]
    [HttpPost("register-admin")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> RegisterAdmin([FromBody] RegisterRequestModel registerRequestModel)
    {
        const Permission permission = Permission.Advanced;

        var createUserResult = await _userService.CreateAsync(registerRequestModel.Username,
            registerRequestModel.Password, registerRequestModel.Name, permission);

        return createUserResult.IsSucceed ? createUserResult : createUserResult.ErrorCode;
    }

    [HttpPost("register")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<None>> Register([FromBody] RegisterRequestModel registerRequestModel)
    {
        const Permission permission = Permission.Basic;

        var createUserResult = await _userService.CreateAsync(registerRequestModel.Username,
            registerRequestModel.Password, registerRequestModel.Name, permission);

        return createUserResult.IsSucceed ? createUserResult : createUserResult.ErrorCode;
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(Result<LoginResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Result<CustomValidationProblemDetails>), StatusCodes.Status422UnprocessableEntity)]
    public async Task<Result<LoginResponseModel>> Login([FromBody] LoginRequestModel registerRequestModel)
    {
        // Get existing user
        var existingUserResult =
            await _userService.GetByUserNameAndCheckPasswordAsync(registerRequestModel.Username,
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