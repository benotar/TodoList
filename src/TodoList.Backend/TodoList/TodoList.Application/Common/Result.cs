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
        => new()
        {
            ErrorCode = errorCode,
            StatusCode = errorCode == Domain.Enums.ErrorCode.AuthenticationServiceUnavailable
                ? HttpStatusCode.ServiceUnavailable
                : HttpStatusCode.BadRequest
        };
}

public record struct None;