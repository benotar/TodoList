using TodoList.Application.Common;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Services;

public class TodoService : ITodoService
{
    public Task<Result<Todo>> CreateAsync()
    {
        throw new NotImplementedException();
    }
}