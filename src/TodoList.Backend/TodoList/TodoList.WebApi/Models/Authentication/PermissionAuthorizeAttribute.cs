using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using TodoList.Application.Common;
using TodoList.Application.Extensions;
using TodoList.Domain.Enums;

namespace TodoList.WebApi.Models.Authentication;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class PermissionAuthorizeAttribute: Attribute, IAsyncAuthorizationFilter
{
    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        if (context.Filters.Any(filter => filter is IAllowAnonymousFilter))
        {
            return;
        }
        
        var user = context.HttpContext.User;
        
        var permissionClaim = user.Claims.FirstOrDefault(claim => 
            claim.Type == nameof(Permission).ToLowerFistLetter())?.Value;

        if (string.IsNullOrEmpty(permissionClaim) || permissionClaim.ToPermission() != Permission.Advanced)
        {
            var problemDetails = new ProblemDetails
            {
                Type = "https://httpstatuses.com/403",
                Title = "Access Denied",
                Detail = "You do not have permission to access this resource.",
                Status = StatusCodes.Status403Forbidden,
                Instance = context.HttpContext.Request.Path
            };

            var result = new Result<ProblemDetails>
            {
                Data = problemDetails,
                ErrorCode = ErrorCode.AccessDenied
            };

            context.Result = new ObjectResult(result)
            {
                StatusCode = StatusCodes.Status403Forbidden
            };
        }

        await Task.CompletedTask;
    }
}