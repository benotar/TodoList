using Microsoft.AspNetCore.Http;

namespace TodoList.Application.Interfaces.Providers;

public interface ICookieProvider
{
    void AddTokensCookiesToResponse(HttpResponse response, string accessToken, string refreshToken);
    void AddFingerprintCookiesToResponse(HttpResponse response, string fingerprint);
}