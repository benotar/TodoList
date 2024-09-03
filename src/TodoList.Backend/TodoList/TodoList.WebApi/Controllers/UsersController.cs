using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Authentication;

namespace TodoList.WebApi.Controllers;

// Testing controller

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    private readonly IRefreshTokenSessionService _refreshTokenSessionService;

    private readonly ICookieProvider _cookieProvider;

    // for testing
    private readonly IDbContext _db;

    private readonly IJwtProvider _jwtProvider;

    public UsersController(IUserService userService, IDbContext db, IJwtProvider jwtProvider,
        IRefreshTokenSessionService refreshTokenSessionService, ICookieProvider cookieProvider)
    {
        _userService = userService;
        _db = db;

        _jwtProvider = jwtProvider;

        _refreshTokenSessionService = refreshTokenSessionService;
        _cookieProvider = cookieProvider;
    }

    [HttpGet("get")]
    public async Task<IActionResult> Get()
    {
        var users = await _db.Users.ToListAsync();

        return users is not null
            ? Ok(users)
            : BadRequest("Empty!");
    }

    [HttpPut("create")]
    public async Task<ActionResult<(string, string, User)>> Create([FromBody] RegisterRequestModel registerRequestModel)
    {
        var userResult = await _userService.CreateAsync(registerRequestModel.Username, registerRequestModel.Password,
            registerRequestModel.Name);

        if (!userResult.IsSucceed)
        {
            return BadRequest(userResult.ErrorCode);
        }

        var user = userResult.Data;

        var accessToken = _jwtProvider.GenerateToken(user, JwtTokenType.Access);
        var refreshToken = _jwtProvider.GenerateToken(user, JwtTokenType.Refresh);

        await _refreshTokenSessionService.CreateOrUpdateAsync(user.Id, "TestFingerprint", refreshToken);

        return Ok(new { accessToken, refreshToken, user });
    }

    [HttpPost("login")]
    public async Task<ActionResult<(Guid userId, bool isSessionExist)>> Login([FromBody] LoginRequestModel loginRequestModel)
    {
        var existingUser = await _db.Users.FirstOrDefaultAsync(us => us.Username.Equals(loginRequestModel.Username));

        if (existingUser is null)
        {
            return BadRequest("User not found!");
        }

        var accessToken = _jwtProvider.GenerateToken(existingUser, JwtTokenType.Access);
        var refreshToken = _jwtProvider.GenerateToken(existingUser, JwtTokenType.Refresh);

        await _refreshTokenSessionService.CreateOrUpdateAsync(existingUser.Id, loginRequestModel.Fingerprint, refreshToken);

        _cookieProvider.AddTokensCookiesToResponse(HttpContext.Response, accessToken, refreshToken);
        
        _cookieProvider.AddFingerprintCookiesToResponse(HttpContext.Response, loginRequestModel.Fingerprint);

        var userId = _jwtProvider.GetUserIdFromRefreshToken(refreshToken);

        if (userId == Guid.Empty)
        {
            return BadRequest(userId);
        }

        var isSessionExistsResult =
            await _refreshTokenSessionService.SessionKeyExistsAsync(userId, loginRequestModel.Fingerprint);

        var isSessionExist = isSessionExistsResult.Data;


        return Ok(new { userId, isSessionExist });
    }
    

}