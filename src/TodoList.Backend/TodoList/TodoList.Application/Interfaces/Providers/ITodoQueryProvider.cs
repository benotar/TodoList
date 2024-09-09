using System.Linq.Expressions;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Interfaces.Providers;

public interface ITodoQueryProvider
{
    Expression<Func<Todo, bool>> ByUserId(Guid userId);
    Expression<Func<Todo, bool>> ByTitle(string title);
    Expression<Func<Todo, bool>> ByTodoId(Guid todoId);

    Task<TResult> FindTodoByConditionAsync<TResult>
    (Expression<Func<Todo, bool>> condition, Func<IQueryable<Todo>, Task<TResult>> queryFunction,
        bool isUseTracking = false);
}