﻿using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Authentication;

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
    [ProducesResponseType(typeof(Result<RefreshTokenResponseModel>), StatusCodes.Status200OK)]
    public async Task<Result<RefreshTokenResponseModel>> Refresh()
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

        var userData = _jwtProvider.GetUserDataFromRefreshToken(refreshToken);

        if (userData.UserId == Guid.Empty)
        {
            return ErrorCode.UserIdNotValid;
        }
        
        var isSessionExistsResult = await _refreshTokenSessionService
            .SessionKeyExistsAsync(userData.UserId, fingerprint);

        if (!isSessionExistsResult.IsSucceed)
        {
            return isSessionExistsResult.ErrorCode;
        }

        var accessToken = _jwtProvider.GenerateToken(userData.UserId, JwtTokenType.Access, userData.Permission);

        refreshToken = _jwtProvider.GenerateToken(userData.UserId, JwtTokenType.Refresh, userData.Permission);

        await _refreshTokenSessionService.CreateOrUpdateAsync(userData.UserId, fingerprint, refreshToken);

        _cookieProvider.AddRefreshTokenCookiesToResponse(HttpContext.Response, refreshToken);

        return new RefreshTokenResponseModel(accessToken);
    }
}