using System.Net;
using TodoList.Domain.Enums;

namespace TodoList.Application.Common;

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
            Domain.Enums.ErrorCode.AuthenticationServiceUnavailable => HttpStatusCode.ServiceUnavailable,
            Domain.Enums.ErrorCode.TodoTableIsEmpty => HttpStatusCode.NoContent,
            Domain.Enums.ErrorCode.UsersTableIsEmpty => HttpStatusCode.NoContent,
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