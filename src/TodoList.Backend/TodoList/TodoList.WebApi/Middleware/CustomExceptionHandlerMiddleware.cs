using StackExchange.Redis;
using TodoList.Application.Common;

namespace TodoList.WebApi.Middleware;

public class CustomExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public CustomExceptionHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }


    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next.Invoke(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";

        switch (ex)
        {
            case RedisConnectionException:
                context.Response.StatusCode = 503;
                await context.Response.WriteAsJsonAsync(Result<None>.Error(ErrorCode.CannotConnectionToRedis));
                break;
            default:
                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(Result<None>.Error(ErrorCode.UnknownError));
                break;
        }
    }
}

public static class CustomExceptionHandlerMiddlewareExtension
{
    public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder app)
        => app.UseMiddleware<CustomExceptionHandlerMiddleware>();
}