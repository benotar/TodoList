namespace TodoList.Application.Common;

public record struct SaltAndHashResult(byte[] Salt, byte[] Hash);