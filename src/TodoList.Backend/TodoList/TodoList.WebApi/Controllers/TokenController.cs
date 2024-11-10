using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Authentication;

namespace TodoList.WebApi.Controllers;

/// <summary>
/// Controller for managing authentication tokens, including refreshing the access token using a refresh token.
/// </summary>
public class TokenController : BaseController
{
    private readonly IJwtProvider _jwtProvider;

    private readonly ICookieProvider _cookieProvider;

    private readonly IRefreshTokenSessionService _refreshTokenSessionService;

    /// <summary>
    /// Initializes a new instance of the <see cref="TokenController"/> class.
    /// </summary>
    /// <param name="jwtProvider">The provider for managing JWT tokens.</param>
    /// <param name="cookieProvider">The provider for managing cookies.</param>
    /// <param name="refreshTokenSessionService">The service for managing refresh token sessions.</param>
    public TokenController(IJwtProvider jwtProvider, ICookieProvider cookieProvider,
        IRefreshTokenSessionService refreshTokenSessionService)
    {
        _jwtProvider = jwtProvider;

        _cookieProvider = cookieProvider;

        _refreshTokenSessionService = refreshTokenSessionService;
    }

    /// <summary>
    /// Refreshes the access token using the provided refresh token from the cookies.
    /// </summary>
    /// <response code="200">Access token refreshed successfully.</response>
    /// <response code="401">Unauthorized. Refresh token is invalid or expired.</response>
    /// <response code="422">Unprocessable entity. Validation errors such as missing required cookies or invalid session.</response>
    /// <returns>The new access token and the updated refresh token.</returns>
    /// <remarks>
    /// **Example Request:**
    /// 
    /// POST http://localhost:5000/token/refresh
    /// 
    /// **Example Response:**
    /// 
    /// ```json
    /// {
    ///   "data": {
    ///     "accessToken": "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ
    /// 9.eyJqdGkiOiJjZDU4ZGI0Yi1iNWQ3LTRlYTYtODQwOC00NmEyNzFkNjZjZTIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L
    /// 2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE0ODMyZjk5LTgyZDAtNDkzMS05ZGI2LWQzZTU0MjgwZjE3ZiIsInR5cCI6IkFjY2VzcyIs
    /// InBlcm1pc3Npb24iOiJBZHZhbmNlZCIsImV4cCI6MTczMTI2MDUwNSwiaXNzIjoiVG9kb0xpc3QuQmFja2VuZCIsImF1ZCI6IlRvZG9MaXN0LkZyb25
    /// 0ZW5kIn0.HwU-EQctVA8nNWMzS9sdcyTefvacXx99Z6tXEbho2Ec"
    ///   },
    ///   "errorCode": null,
    ///   "isSucceed": true
    /// }
    /// ```
    /// </remarks>
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