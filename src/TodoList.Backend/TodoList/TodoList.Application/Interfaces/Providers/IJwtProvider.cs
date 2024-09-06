using Microsoft.IdentityModel.Tokens;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;

namespace TodoList.Application.Interfaces.Providers;

public interface IJwtProvider
{
    string GenerateToken(User user, JwtTokenType jwtTokenType);
    Guid GetUserIdFromRefreshToken(string refreshToken);
    bool IsTokenValid(string refreshToken, JwtTokenType tokenType);
}