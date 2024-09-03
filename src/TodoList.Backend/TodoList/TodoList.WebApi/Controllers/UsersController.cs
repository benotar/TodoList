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
    // for testing
    private readonly IDbContext _db;
    

    public UsersController(IDbContext db)
    {
        _db = db;
    }

    [HttpGet("get")]
    public async Task<IActionResult> Get()
    {
        var users = await _db.Users.AsNoTracking().ToListAsync();

        return users is not null
            ? Ok(users)
            : BadRequest("Empty!");
    }
}