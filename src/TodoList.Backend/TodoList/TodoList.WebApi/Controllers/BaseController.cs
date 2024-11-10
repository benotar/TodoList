using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace TodoList.WebApi.Controllers;

/// <summary>
/// Base controller class for all API controllers in the application. 
/// Provides common functionality, such as retrieving the user's ID from the claims.
/// The `UserId` property retrieves the unique identifier of the currently authenticated user 
/// from the claims of the current HTTP context.
/// </summary>
[Route("[controller]")]
[ApiController]
public class BaseController : ControllerBase
{
    /// <summary>
    /// Gets the unique identifier (GUID) of the currently authenticated user.
    /// This value is extracted from the claims in the HTTP context and represents the user's identity.
    /// </summary>
    internal  Guid UserId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
}