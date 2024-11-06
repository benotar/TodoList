using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TodoList.Application.Extensions;
using TodoList.Domain.Enums;

namespace TodoList.WebApi.Models.Authentication;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class PermissionAuthorizeAttribute: Attribute, IAsyncAuthorizationFilter
{
    private const Permission AdvancedPermission = Permission.Advanced;
    
    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;
        
        if (!user.Identity.IsAuthenticated)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var permissionClaim = user.Claims.FirstOrDefault(claim => claim.Type == "Permission")?.Value;

        if (string.IsNullOrEmpty(permissionClaim) || permissionClaim.ToPermission() != AdvancedPermission)
        {
            var problemDetails = new ProblemDetails
            {
                Type = "https://httpstatuses.com/403",
                Status = 403,
                Title = "Forbidden",
                Detail = "You do not have permission to access this resource."
            };

            context.Result = new ObjectResult(problemDetails)
            {
                StatusCode = 403
            };

            return;
        }

        await Task.CompletedTask;
    }
}