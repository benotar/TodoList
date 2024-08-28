using Microsoft.IdentityModel.Tokens;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Interfaces.Providers;

public interface IJwtProvider
{
    string GenerateToken(User user);
}