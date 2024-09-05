using System.Net;
using TodoList.Domain.Enums;

namespace TodoList.Application.Common;

using Errors = Domain.Enums.ErrorCode;
public class Result<TData>
{
    public TData Data { get; set; }
    public ErrorCode? ErrorCode { get; set; }

    public HttpStatusCode StatusCode { get; init; }

    public bool IsSucceed => ErrorCode is null;

    public static Result<TData> Success(TData data = default)
        => new() { Data = data, StatusCode = HttpStatusCode.OK };

    public static Result<TData> Error(ErrorCode? errorCode)
    {
        var statusCode = errorCode switch
        {
            Errors.AuthenticationServiceUnavailable => HttpStatusCode.ServiceUnavailable,
            Errors.TodoTableIsEmpty => HttpStatusCode.NoContent,
            Errors.UsersTableIsEmpty => HttpStatusCode.NoContent,
            _ => HttpStatusCode.BadRequest
        };

        return new Result<TData>
        {
            ErrorCode = errorCode,
            StatusCode = statusCode
        };
    }
}

public record struct None;