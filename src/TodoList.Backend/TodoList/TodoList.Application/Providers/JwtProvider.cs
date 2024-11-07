using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TodoList.Application.Configurations;
using TodoList.Application.DTOs;
using TodoList.Application.Extensions;
using TodoList.Application.Interfaces.Providers;
using TodoList.Domain.Enums;

namespace TodoList.Application.Providers;

public class JwtProvider : IJwtProvider
{
    private readonly JwtConfiguration _jwtConfig;

    private readonly IDateTimeProvider _dateTimeProvider;

    private readonly TokenValidationParameters _validationParameters;

    public JwtProvider(IOptions<JwtConfiguration> jwtConfig, IDateTimeProvider dateTimeProvider, TokenValidationParameters validationParameters)
    {
        _jwtConfig = jwtConfig.Value;

        _dateTimeProvider = dateTimeProvider;
        
        _validationParameters = validationParameters;
    }
    
    public string GenerateToken(Guid userId, JwtTokenType jwtTokenType, Permission permission)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.SecretKey));

        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(ClaimTypes.NameIdentifier, userId.ToString()),
            new(JwtRegisteredClaimNames.Typ, jwtTokenType.ToString()),
            new(nameof(Permission).ToLowerFistLetter(), permission.ToString())
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

    public UserDataFromRefreshTokenDto GetUserDataFromRefreshToken(string refreshToken)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        var claims = tokenHandler.ReadJwtToken(refreshToken).Claims;

        var userIdString = claims.FirstOrDefault(claim => 
            claim.Type.Equals(ClaimTypes.NameIdentifier)).Value;
        
        var permissionString = claims.FirstOrDefault(claim => 
            claim.Type.Equals(nameof(Permission).ToLowerFistLetter())).Value;
        
        var userIdResult = Guid.TryParse(userIdString, out var userId) ? userId : Guid.Empty;
        
        return new UserDataFromRefreshTokenDto(userIdResult, permissionString.ToPermission());
    }
    
    public bool IsTokenValid(string refreshToken, JwtTokenType tokenType)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        ClaimsPrincipal? principal = null;

        try
        {
            principal = tokenHandler.ValidateToken(refreshToken, _validationParameters, out _);
        }
        catch (Exception)
        {
            return false;
        }

        var tokenTypeClaim = principal.Claims.FirstOrDefault(claim => claim.Type.Equals(JwtRegisteredClaimNames.Typ));

        var tokenTypeValue = tokenTypeClaim?.Value;

        return tokenTypeValue != null && tokenTypeValue.Equals(tokenType.ToString());
    }
}