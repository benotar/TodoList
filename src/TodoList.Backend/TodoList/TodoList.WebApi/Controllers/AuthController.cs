using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Authentication;

namespace TodoList.WebApi.Controllers;

public class AuthController : BaseController
{
    private readonly IUserService _userService;
    private readonly IRefreshTokenSessionService _refreshTokenSessionService;

    private readonly IJwtProvider _jwtProvider;
    private readonly ICookieProvider _cookieProvider;

    public AuthController(IUserService userService,
        IRefreshTokenSessionService refreshTokenSessionService,
        IJwtProvider jwtProvider,
        ICookieProvider cookieProvider)
    {
        _userService = userService;
        _refreshTokenSessionService = refreshTokenSessionService;

        _jwtProvider = jwtProvider;
        _cookieProvider = cookieProvider;
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register(RegisterRequestModel registerRequestModel)
    {
        // ALGORITHM:
        // Try to create user, check success, create user

        if (registerRequestModel is null)
        {
            return BadRequest("Data must not be empty.");
        }

        var createUserResult = await _userService.CreateAsync(registerRequestModel.Username,
            registerRequestModel.Password, registerRequestModel.Name);

        return createUserResult.IsSucceed
            ? NoContent() // For release - Redirect("/login")
            : BadRequest(createUserResult.ErrorCode);
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Login([FromBody] LoginRequestModel registerRequestModel)
    {
        // ALGORITHM:
        // Get user by login and password, check existing, generate tokens, create/update session, add tokens and fingerprint to response cookies

        var existingUserResult =
            await _userService.GetExistingUser(registerRequestModel.Username, registerRequestModel.Password);

        if (!existingUserResult.IsSucceed)
        {
            return BadRequest(existingUserResult.ErrorCode);
        }

        var user = existingUserResult.Data;

        var accessToken = _jwtProvider.GenerateToken(user, JwtTokenType.Access);
        var refreshToken = _jwtProvider.GenerateToken(user, JwtTokenType.Refresh);

        await _refreshTokenSessionService.CreateOrUpdateAsync(user.Id, registerRequestModel.Fingerprint, refreshToken);

        _cookieProvider.AddTokensCookiesToResponse(HttpContext.Response, accessToken, refreshToken);
        _cookieProvider.AddFingerprintCookiesToResponse(HttpContext.Response, registerRequestModel.Fingerprint);

        return Ok("Login successful");
    }
}