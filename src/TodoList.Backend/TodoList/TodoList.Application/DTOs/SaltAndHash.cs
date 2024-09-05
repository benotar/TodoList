namespace TodoList.Application.DTOs;

public record struct SaltAndHash(byte[] Salt, byte[] Hash);