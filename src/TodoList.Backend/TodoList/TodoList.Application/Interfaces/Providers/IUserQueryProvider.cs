using System.Linq.Expressions;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Interfaces.Providers;

public interface IUserQueryProvider
{
    Expression<Func<User, bool>> ByUsername(string username);
    Expression<Func<User, bool>> ByUserId(Guid userId);
    Task<TResult> FindUserByConditionAsync<TResult>
    (Expression<Func<User, bool>> condition, Func<IQueryable<User>, Task<TResult>> queryFunction,
        bool isUseTracking = false);
}