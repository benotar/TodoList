using System.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Authentication;

namespace TodoList.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    private readonly IRefreshTokenSessionService _refreshTokenSessionService;

    private readonly IJwtProvider _jwtProvider;
    
    public AuthController(IUserService userService, IJwtProvider jwtProvider, IRefreshTokenSessionService refreshTokenSessionService)
    {
        _userService = userService;
        
        _jwtProvider = jwtProvider;
        
        _refreshTokenSessionService = refreshTokenSessionService;
    }

    [HttpPost("register")]
    [ProducesResponseType(typeof(IActionResult), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(IActionResult), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterRequestModel registerRequestModel)
    {
        // ALGORITHM:
        // Try to create user, check success, create user
        
        var createUserResult = await _userService.CreateAsync(registerRequestModel.UserName,
            registerRequestModel.Password, registerRequestModel.Name);

        if (!createUserResult.IsSucceed)
        {
            return BadRequest(createUserResult.ErrorCode);
        }

        return Created();
    }

    // [HttpPost("login")]
    // [ProducesResponseType(typeof(IActionResult), StatusCodes.Status200OK)]
    // [ProducesResponseType(typeof(IActionResult), StatusCodes.Status400BadRequest)]
    // public async Task<IActionResult> Login([FromBody] LoginRequestModel registerRequestModel)
    // {
    //     // ALGORITHM:
    //     // Get user by credentials, check existing, generate tokens, create/update session, add tokens and fingerprint to response cookies
    //     
    //     
    // }
}