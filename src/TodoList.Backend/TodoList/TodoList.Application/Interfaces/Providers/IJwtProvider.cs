using Microsoft.IdentityModel.Tokens;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;

namespace TodoList.Application.Interfaces.Providers;

public interface IJwtProvider
{
    string GenerateToken(User user, JwtTokenType jwtTokenType);
}