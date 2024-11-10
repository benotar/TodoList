using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using TodoList.Application.Common;
using TodoList.Domain.Enums;

namespace TodoList.WebApi.Infrastructure;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;
    private readonly JsonSerializerOptions _options;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger, JsonSerializerOptions options)
    {
        _logger = logger;
        _options = options;
    }

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, exception.Message);

        int statusCode;

        ErrorCode errorCode;

        switch (exception)
        {
            case InvalidOperationException:
            case RedisConnectionException:
                statusCode = StatusCodes.Status503ServiceUnavailable;
                errorCode = ErrorCode.AuthenticationServiceUnavailable;
                break;
            default:
                statusCode = StatusCodes.Status500InternalServerError;
                errorCode = ErrorCode.UnknownError;
                break;
        }

        var details = new ProblemDetails
        {
            Type = "Server Error",
            Title = "Unexpected API Error",
            Detail = "One or more unexpected errors occurred.",
            Status = statusCode,
            Instance = httpContext.Request.Path
        };

        var result = new Result<ProblemDetails>
        {
            ErrorCode = errorCode,
            Data = details
        };

        httpContext.Response.ContentType = "application/json";

        await httpContext.Response.WriteAsync(JsonSerializer.Serialize(result, _options),
            cancellationToken);

        return true;
    }
}