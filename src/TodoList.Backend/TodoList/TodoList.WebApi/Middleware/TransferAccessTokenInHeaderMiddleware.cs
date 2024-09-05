using TodoList.Application.Configurations;

namespace TodoList.WebApi.Middleware;

public class TransferAccessTokenInHeaderMiddleware
{
    private readonly RequestDelegate _next;
    private readonly CookiesConfiguration _cookiesConfiguration;

    public TransferAccessTokenInHeaderMiddleware(RequestDelegate next, CookiesConfiguration cookiesConfiguration)
    {
        _next = next;
        
        _cookiesConfiguration = cookiesConfiguration;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var accessToken = context.Request.Cookies[_cookiesConfiguration.AccessTokenCookieKey];

        var headers = context.Request.Headers;
        
        if (!string.IsNullOrEmpty(accessToken))
        {
            headers.Remove("Authorization");
        
            headers.Append("Authorization", $"Bearer {accessToken}");
        }
        
        await _next(context);
    }
}

public static class TransferAccessTokenInHeaderMiddlewareExtensions
{
    public static IApplicationBuilder UseTransferAccessTokenInHeader(this IApplicationBuilder app)
        => app.UseMiddleware<TransferAccessTokenInHeaderMiddleware>();
}