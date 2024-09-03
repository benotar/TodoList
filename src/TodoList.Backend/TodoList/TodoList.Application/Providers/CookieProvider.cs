using Microsoft.AspNetCore.Http;
using TodoList.Application.Configurations;
using TodoList.Application.DTOs;
using TodoList.Application.Interfaces.Providers;

namespace TodoList.Application.Providers;

public class CookieProvider : ICookieProvider
{
    private readonly IDateTimeProvider _dateTimeProvider;

    private readonly RefreshTokenSessionConfiguration _refreshTokenSessionConfiguration;

    private readonly JwtConfiguration _jwtConfiguration;

    private readonly CookiesConfiguration _cookiesConfiguration;

    public CookieProvider(RefreshTokenSessionConfiguration refreshTokenSessionConfiguration,
        IDateTimeProvider dateTimeProvider, 
        CookiesConfiguration cookiesConfiguration,
        JwtConfiguration jwtConfiguration)
    {
        _dateTimeProvider = dateTimeProvider;

        _refreshTokenSessionConfiguration = refreshTokenSessionConfiguration;

        _jwtConfiguration = jwtConfiguration;

        _cookiesConfiguration = cookiesConfiguration;
    }

    public void AddTokensCookiesToResponse(HttpResponse response, string accessToken, string refreshToken)
    {
        response.Cookies.Append(_cookiesConfiguration.AccessTokenCookieKey, accessToken,
            new CookieOptions
            {
                Secure = false,
                HttpOnly = true,
                SameSite = SameSiteMode.Lax,
                Expires = new DateTimeOffset(
                    _dateTimeProvider.UtcNow.AddMinutes(_jwtConfiguration.AccessExpirationMinutes))
            });

        response.Cookies.Append(_cookiesConfiguration.RefreshTokenCookieKey, refreshToken,
            CreateCookieOptionsWithDays(_jwtConfiguration.RefreshExpirationDays));
    }

    public void AddFingerprintCookiesToResponse(HttpResponse response, string fingerprint)
    {
        response.Cookies.Append(_cookiesConfiguration.FingerprintCookieKey, fingerprint,
            CreateCookieOptionsWithDays(_refreshTokenSessionConfiguration.ExpirationDays));
    }

    public TokensDto GetTokensFromCookies(HttpRequest request)
    {
        request.Cookies.TryGetValue(_cookiesConfiguration.AccessTokenCookieKey, out var accessToken);
        request.Cookies.TryGetValue(_cookiesConfiguration.RefreshTokenCookieKey, out var refreshToken);

        return new TokensDto { AccessToken = accessToken, RefreshToken = refreshToken };
    }

    public string? GetFingerprintFromCookies(HttpRequest request)
    {
        request.Cookies.TryGetValue(_cookiesConfiguration.FingerprintCookieKey, out var fingerprint);

        return fingerprint;
    }

    private CookieOptions CreateCookieOptionsWithDays(int expirationDays)
        => new CookieOptions
        {
            Secure = false,
            HttpOnly = true,
            SameSite = SameSiteMode.Lax,
            Expires = new DateTimeOffset(
                _dateTimeProvider.UtcNow.AddDays(expirationDays))
        };
}