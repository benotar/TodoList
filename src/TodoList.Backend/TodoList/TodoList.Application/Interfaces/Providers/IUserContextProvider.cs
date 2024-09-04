using TodoList.Application.Common;

namespace TodoList.Application.Interfaces.Providers;

public interface IUserContextProvider
{
    Result<Guid> GetUserId();
}