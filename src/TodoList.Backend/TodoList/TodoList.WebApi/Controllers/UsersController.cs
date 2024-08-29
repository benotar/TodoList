using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Application.DTOs;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;

namespace TodoList.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    
    // for testing
    private readonly IDbContext _db;

    private readonly IJwtProvider _jwtProvider;

    public UsersController(IUserService userService, IDbContext db, IJwtProvider jwtProvider)
    {
        _userService = userService;
        _db = db;
        
        _jwtProvider = jwtProvider;
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
    public async Task<ActionResult<(string, string, User)>> Create([FromBody] CreateUserDto createUserDto)
    {
        var user = await _userService.CreateAsync(createUserDto);

        if (!user.IsSucceed)
        {
            return BadRequest(user.ErrorCode);
        }

        var accessToken = _jwtProvider.GenerateToken(user.Data, JwtTokenType.Access);
        var refreshToken = _jwtProvider.GenerateToken(user.Data, JwtTokenType.Refresh);

        return Ok(new { accessToken, refreshToken, user.Data });
    }
}