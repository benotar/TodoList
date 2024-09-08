using Microsoft.AspNetCore.Http;
using TodoList.Application.DTOs;

namespace TodoList.Application.Interfaces.Providers;

public interface ICookieProvider
{
    void AddTokensCookiesToResponse(HttpResponse response, string accessToken, string refreshToken);
    void AddFingerprintCookiesToResponse(HttpResponse response, string fingerprint);
    TokensDto GetTokensFromCookies(HttpRequest request);
    string? GetFingerprintFromCookies(HttpRequest request);
    void DeleteCookiesFromResponse(HttpResponse response);
}