using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Application.DTOs;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;

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
    public async Task<IActionResult> Create([FromBody] CreateUserDto createUserDto)
    {
        var user = await _userService.CreateAsync(createUserDto);

        if (!user.IsSucceed)
        {
            return BadRequest(user.ErrorCode);
        }

        var token = _jwtProvider.GenerateToken(user.Data);
        
        return Ok(token);
    }
}