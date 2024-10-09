using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Serilog;
using StackExchange.Redis;
using TodoList.Application.Common;
using TodoList.Domain.Enums;

namespace TodoList.WebApi.Middleware;

public class CustomExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;

    private readonly JsonSerializerOptions _jsonOptions;

    private readonly ILogger<CustomExceptionHandlerMiddleware> _logger;

    public CustomExceptionHandlerMiddleware(RequestDelegate next,
        IOptions<Microsoft.AspNetCore.Mvc.JsonOptions> jsonOptions, ILogger<CustomExceptionHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;

        _jsonOptions = jsonOptions.Value.JsonSerializerOptions;
    }


    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next.Invoke(context);
        }
        catch (Exception ex)
        {
            _logger.LogCritical(ex, "An error occured while processing the request.");

            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";

        Result<None> result;

        switch (ex)
        {
            case InvalidOperationException:
            case RedisConnectionException:
                context.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
                result = Result<None>.Error(ErrorCode.AuthenticationServiceUnavailable);
                break;
            case DbUpdateException:
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                result = Result<None>.Error(ErrorCode.DataNotSavedToDatabase);
                break;
            default:
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                result = Result<None>.Error(ErrorCode.DataNotSavedToDatabase);
                break;
        }

        await context.Response.WriteAsJsonAsync(result, _jsonOptions);
    }
}

public static class CustomExceptionHandlerMiddlewareExtension
{
    public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder app)
        => app.UseMiddleware<CustomExceptionHandlerMiddleware>();
}