using System.Net;
using TodoList.Domain.Enums;

namespace TodoList.Application.Common;

using Errors = ErrorCode;

public class Result<TData>
{
    public TData Data { get; private set; }
    public ErrorCode? ErrorCode { get; private set; }
    public WarningCode? WarningCode { get; private set; }
    public HttpStatusCode StatusCode { get; private set; }
    public bool IsSucceed => ErrorCode is null;

    public static Result<TData> Success(TData data = default)
        => new() { Data = data, StatusCode = HttpStatusCode.OK };

    public static Result<TData> SuccessWithWarning(WarningCode warningCode, TData data = default)
        => new() { Data = data, WarningCode = warningCode, StatusCode = HttpStatusCode.OK };

    public static Result<TData> Error(ErrorCode? errorCode)
        => new()
        {
            ErrorCode = errorCode,
            StatusCode = errorCode switch
            {
                Errors.AuthenticationServiceUnavailable => HttpStatusCode.ServiceUnavailable,
                Errors.AccessDenied => HttpStatusCode.Forbidden,
                _ => HttpStatusCode.BadRequest
            }
        };
}

public record struct None;