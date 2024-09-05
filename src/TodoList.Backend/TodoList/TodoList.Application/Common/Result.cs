using TodoList.Domain.Enums;

namespace TodoList.Application.Common;

public class Result<TData>
{
    public TData Data { get; set; }
    public ErrorCode? ErrorCode { get; set; }
    public bool IsSucceed => ErrorCode is null;

    public static Result<TData> Success(TData data = default)
        => new() { Data = data };

    public static Result<TData> Error(ErrorCode? errorCode)
        => new() { ErrorCode = errorCode };
}

public record struct None;