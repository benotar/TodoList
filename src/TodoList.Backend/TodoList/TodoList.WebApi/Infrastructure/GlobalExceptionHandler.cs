using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using TodoList.Application.Extensions;
using TodoList.Domain.Enums;

namespace TodoList.WebApi.Infrastructure;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
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
            case DbUpdateException:
                statusCode = StatusCodes.Status500InternalServerError;
                errorCode = ErrorCode.DataNotSavedToDatabase;
                break;
            default:
                statusCode = StatusCodes.Status500InternalServerError;
                errorCode = ErrorCode.UnknownError;
                break;
        }

        var details = new ProblemDetails
        {
            Detail = errorCode.ToErrorString(),
            Instance = "TodoList API",
            Status = statusCode,
            Title = "API Error",
            Type = "Server Error"
        };

        httpContext.Response.ContentType = "application/json";

        await httpContext.Response.WriteAsJsonAsync(details, cancellationToken);

        return true;
    }
}