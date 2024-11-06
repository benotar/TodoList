using Microsoft.IdentityModel.Tokens;
using TodoList.Application.DTOs;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;

namespace TodoList.Application.Interfaces.Providers;

public interface IJwtProvider
{
    string GenerateToken(Guid userId, JwtTokenType jwtTokenType, Permission permission);
    UserDataFromRefreshTokenDto GetUserDataFromRefreshToken(string refreshToken);
    bool IsTokenValid(string refreshToken, JwtTokenType tokenType);
}