﻿using Microsoft.AspNetCore.Http;

namespace TodoList.Application.Interfaces.Providers;

public interface ICookieProvider
{
    void AddRefreshTokenCookiesToResponse(HttpResponse response,string refreshToken);
    void AddFingerprintCookiesToResponse(HttpResponse response, string fingerprint);
    string? GetRefreshTokenFromCookies(HttpRequest request);
    string? GetFingerprintFromCookies(HttpRequest request);
    void DeleteCookiesFromResponse(HttpResponse response);
}