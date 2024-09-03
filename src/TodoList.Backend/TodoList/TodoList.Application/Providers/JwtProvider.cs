﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TodoList.Application.Configurations;
using TodoList.Application.Interfaces.Providers;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;

namespace TodoList.Application.Providers;

public class JwtProvider : IJwtProvider
{
    private readonly JwtConfiguration _jwtConfig;

    private readonly IDateTimeProvider _dateTimeProvider;
    
    public JwtProvider(IOptions<JwtConfiguration> jwtConfig, IDateTimeProvider dateTimeProvider)
    {
        _jwtConfig = jwtConfig.Value;
        
        _dateTimeProvider = dateTimeProvider;
    }

    public string GenerateToken(User user, JwtTokenType jwtTokenType)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.SecretKey));
        
        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Name, user.Name),
            new Claim(JwtRegisteredClaimNames.Nickname, user.Username),
            new Claim(JwtRegisteredClaimNames.Typ, jwtTokenType.ToString())
        };

        var expires = jwtTokenType switch
        {
            JwtTokenType.Access => _dateTimeProvider.UtcNow.AddMinutes(_jwtConfig.AccessExpirationMinutes),
            JwtTokenType.Refresh => _dateTimeProvider.UtcNow.AddDays(_jwtConfig.RefreshExpirationDays),
            _ => throw new ArgumentOutOfRangeException(nameof(jwtTokenType), jwtTokenType,
                "Unknown JWT type enum value!")
        };
        
        var securityToken = new JwtSecurityToken(
            issuer: _jwtConfig.Issuer,
            audience: _jwtConfig.Audience,
            expires: expires,
            claims: claims,
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
}