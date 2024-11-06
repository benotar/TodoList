using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace TodoList.WebApi.Controllers;

// Parent class for all controllers
[Route("[controller]")]
[ApiController]
public class BaseController : ControllerBase
{
    internal Guid UserId => Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
    
    protected Guid GetUserId()
    {
        var userIdString = this.User.Claims.First(claim => claim.Type.Equals(ClaimTypes.NameIdentifier))
            .Value;
        
        Guid.TryParse(userIdString, out var userId);

        return userId;
    }
}