using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Enums;

namespace TodoList.WebApi.Controllers;

public class TokenController : BaseController
{
    private readonly IJwtProvider _jwtProvider;

    private readonly ICookieProvider _cookieProvider;

    private readonly IRefreshTokenSessionService _refreshTokenSessionService;

    public TokenController(IJwtProvider jwtProvider, ICookieProvider cookieProvider,
        IRefreshTokenSessionService refreshTokenSessionService)
    {
        _jwtProvider = jwtProvider;

        _cookieProvider = cookieProvider;

        _refreshTokenSessionService = refreshTokenSessionService;
    }

    [HttpPost("refresh")]
    [ProducesResponseType(typeof(Result<string>), StatusCodes.Status200OK)]
    public async Task<Result<string>> Refresh()
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

        if (userId == Guid.Empty)
        {
            return ErrorCode.UserIdNotValid;
        }

        var sessionExistsResult = await _refreshTokenSessionService
            .SessionKeyExistsAsync(userId, fingerprint);

        if (!sessionExistsResult.IsSucceed)
        {
            return sessionExistsResult.ErrorCode;
        }

        var accessToken = _jwtProvider.GenerateToken(userId, JwtTokenType.Access);

        refreshToken = _jwtProvider.GenerateToken(userId, JwtTokenType.Refresh);

        await _refreshTokenSessionService.CreateOrUpdateAsync(userId, fingerprint, refreshToken);

        _cookieProvider.AddRefreshTokenCookiesToResponse(HttpContext.Response, refreshToken);

        return accessToken;
    }
}