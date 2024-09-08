using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace TodoList.WebApi.Controllers;

// Parent class for all controllers
[Route("api/[controller]")]
[ApiController]
public class BaseController : ControllerBase
{
    protected Guid GetUserId()
    {
        var userIdString = this.User.Claims.First(claim => claim.Type.Equals(ClaimTypes.NameIdentifier))
            .Value;
        
        Guid.TryParse(userIdString, out var userId);

        return userId;
    }
}