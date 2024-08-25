using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Application.Interfaces;

namespace TodoList.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IDbContext _db;

    public UsersController(IDbContext db)
    {
        _db = db;
    }

    [HttpGet("test")]
    public async Task<IActionResult> Test()
    {
        var users = await _db.Users.AsNoTracking().ToListAsync();

        if (users is null)
        {
            return Ok("Empty");
        }

        return Ok(users);
    }
}