using Microsoft.AspNetCore.Http;
using TodoList.Application.Configurations;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;

namespace TodoList.Application.Providers;

public class CookieProvider : ICookieProvider
{
    private readonly IDateTimeProvider _dateTimeProvider;

    private readonly RefreshSessionConfiguration _refreshSessionConfiguration;

    private readonly CookiesConfiguration _cookiesConfiguration;

    private readonly CookieOptions _cookieOptions;

    public CookieProvider(IDateTimeProvider dateTimeProvider, RefreshSessionConfiguration refreshSessionConfiguration, CookiesConfiguration cookiesConfiguration)
    {
        _dateTimeProvider = dateTimeProvider;
        
        _refreshSessionConfiguration = refreshSessionConfiguration;
        
        _cookiesConfiguration = cookiesConfiguration;

        _cookieOptions = new CookieOptions
        {
            Secure = false,
            HttpOnly = true,
            SameSite = SameSiteMode.Lax,
            Expires = new DateTimeOffset(
                _dateTimeProvider.UtcNow.AddMinutes(_refreshSessionConfiguration.ExpirationMinutes))
        };
    }

    public void AddTokensCookiesToResponse(HttpResponse response, string accessToken, string refreshToken)
    {
        response.Cookies.Append(_cookiesConfiguration.AccessTokenCookieKey,accessToken,_cookieOptions);
        
        response.Cookies.Append(_cookiesConfiguration.RefreshTokenCookieKey, refreshToken, _cookieOptions);
    }

    public void AddFingerprintCookiesToResponse(HttpResponse response, string fingerprint)
    {
        response.Cookies.Append(_cookiesConfiguration.FingerprintCookieKey, fingerprint, _cookieOptions);
    }
}