using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Authentication;

namespace TodoList.WebApi.Controllers;

public class AuthController : BaseController
{
    private readonly IUserService _userService;
    private readonly IRefreshTokenSessionService _refreshTokenSessionService;

    private readonly IJwtProvider _jwtProvider;
    private readonly ICookieProvider _cookieProvider;

    public AuthController(IUserService userService, IRefreshTokenSessionService refreshTokenSessionService,
        IJwtProvider jwtProvider, ICookieProvider cookieProvider)
    {
        _userService = userService;
        _refreshTokenSessionService = refreshTokenSessionService;

        _jwtProvider = jwtProvider;
        _cookieProvider = cookieProvider;
    }

    [HttpPost("register")]
    [ProducesResponseType(typeof(Result<User>), StatusCodes.Status200OK)]
    public async Task<Result<User>> Register(RegisterRequestModel registerRequestModel)
        => await _userService.CreateAsync(registerRequestModel.Username,
            registerRequestModel.Password, registerRequestModel.Name);

    [HttpPost("login")]
    [ProducesResponseType(typeof(Result<string>), StatusCodes.Status200OK)]
    public async Task<Result<string>> Login(LoginRequestModel registerRequestModel)
    {
        // ALGORITHM:
        // Get user by login and password, check existing, generate tokens, create/update session, add tokens and fingerprint to response cookies

        var existingUserResult =
            await _userService.GetExistingUser(registerRequestModel.Username, registerRequestModel.Password);

        if (!existingUserResult.IsSucceed)
        {
            return existingUserResult.ErrorCode;
        }

        var user = existingUserResult.Data;

        var accessToken = _jwtProvider.GenerateToken(user.Id, JwtTokenType.Access);
        var refreshToken = _jwtProvider.GenerateToken(user.Id, JwtTokenType.Refresh);

        await _refreshTokenSessionService.CreateOrUpdateAsync(user.Id, registerRequestModel.Fingerprint, refreshToken);

        _cookieProvider.AddRefreshTokenCookiesToResponse(HttpContext.Response, refreshToken);
        _cookieProvider.AddFingerprintCookiesToResponse(HttpContext.Response, registerRequestModel.Fingerprint);

        return accessToken;
    }

    [HttpPost("logout")]
    [ProducesResponseType(typeof(Result<None>), StatusCodes.Status200OK)]
    public async Task<Result<None>> Logout()
    {
        var refreshToken = _cookieProvider.GetRefreshTokenFromCookies(HttpContext.Request);

        if (refreshToken is null)
        {
            return ErrorCode.RefreshCookieNotFound;
        }

        if (!_jwtProvider.IsTokenValid(refreshToken, JwtTokenType.Refresh))
        {
            return ErrorCode.InvalidRefreshToken;
        }

        var fingerprint = _cookieProvider.GetFingerprintFromCookies(HttpContext.Request);

        if (string.IsNullOrEmpty(fingerprint))
        {
            return ErrorCode.FingerprintCookieNotFound;
        }

        var userId = _jwtProvider.GetUserIdFromRefreshToken(refreshToken);

        await _refreshTokenSessionService.DeleteAsync(userId, fingerprint);

        _cookieProvider.DeleteCookiesFromResponse(HttpContext.Response);

        return Result<None>.Success();
    }
}