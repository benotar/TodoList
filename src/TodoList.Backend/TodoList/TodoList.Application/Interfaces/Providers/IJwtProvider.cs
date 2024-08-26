namespace TodoList.Application.Interfaces.Providers;

public interface IJwtProvider
{
    string GenerateToken();
}