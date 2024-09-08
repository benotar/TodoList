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

    private readonly IUserService _userService;

    private readonly IRefreshTokenSessionService _refreshTokenSessionService;

    public TokenController(IJwtProvider jwtProvider, ICookieProvider cookieProvider, IUserService userService,
        IRefreshTokenSessionService refreshTokenSessionService)
    {
        _jwtProvider = jwtProvider;

        _cookieProvider = cookieProvider;

        _userService = userService;

        _refreshTokenSessionService = refreshTokenSessionService;
    }

    [HttpPost("refresh")]
    public async Task<Result<None>> Refresh()
    {
        var refreshToken = _cookieProvider.GetTokensFromCookies(HttpContext.Request).RefreshToken;

        if (refreshToken is null)
        {
            return Result<None>.Error(ErrorCode.RefreshCookieNotFound);
        }

        var fingerprint = _cookieProvider.GetFingerprintFromCookies(HttpContext.Request);

        if (fingerprint is null)
        {
            return Result<None>.Error(ErrorCode.FingerprintCookieNotFound);
        }

        if (!_jwtProvider.IsTokenValid(refreshToken, JwtTokenType.Refresh))
        {
            return Result<None>.Error(ErrorCode.InvalidRefreshToken);
        }

        var userResult = await _userService
            .GetUserById(_jwtProvider
                .GetUserIdFromRefreshToken(refreshToken));

        if (!userResult.IsSucceed)
        {
            return Result<None>.Error(userResult.ErrorCode);
        }

        var user = userResult.Data;

        var sessionExistsResult = await _refreshTokenSessionService
            .SessionKeyExistsAsync(user.Id, fingerprint);

        if (!sessionExistsResult.IsSucceed)
        {
            return Result<None>.Error(sessionExistsResult.ErrorCode);
        }

        var accessToken = _jwtProvider.GenerateToken(user, JwtTokenType.Access);
        
        refreshToken = _jwtProvider.GenerateToken(user, JwtTokenType.Refresh);

        await _refreshTokenSessionService.CreateOrUpdateAsync(user.Id, fingerprint, refreshToken);

        _cookieProvider.AddTokensCookiesToResponse(HttpContext.Response, accessToken, refreshToken);

        return Result<None>.Success();
    }
}