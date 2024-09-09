using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Application.Interfaces.Providers;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Providers;

public class UserQueryProvider : IUserQueryProvider
{
    private readonly IDbContext _dbContext;

    public UserQueryProvider(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Expression<Func<User, bool>> ByUsername(string username)
        => user => user.Username.Equals(username);

    public Expression<Func<User, bool>> ByUserId(Guid userId)
        => user => user.Id.Equals(userId);
    
    public Task<TResult> FindUserByConditionAsync<TResult>
    (Expression<Func<User, bool>> condition, Func<IQueryable<User>, Task<TResult>> queryFunction, bool isUseTracking = false)
    {
        var query = isUseTracking switch
        {
            true => _dbContext.Users.AsTracking(),
            _ => _dbContext.Users.AsNoTracking()
        };

        return queryFunction(query.Where(condition));
    }
}