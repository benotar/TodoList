using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Providers;

namespace TodoList.Application.Providers;

public class UserContextProvider : IUserContextProvider
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserContextProvider(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Result<Guid>? GetUserId()
    {
        var userIdString = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier).Value;

        return Guid.TryParse(userIdString, out var userId)
            ? Result<Guid>.Success(userId)
            : Result<Guid>.Error(ErrorCode.CannotGetUserId);
    }
}