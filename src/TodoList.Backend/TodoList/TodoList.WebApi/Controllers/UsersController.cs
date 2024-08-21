using Microsoft.AspNetCore.Mvc;

namespace TodoList.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("Hello, World!");
    }
}