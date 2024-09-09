using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Application.Interfaces.Providers;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Providers;

public class TodoQueryProvider : ITodoQueryProvider
{
    private readonly IDbContext _dbContext;

    public TodoQueryProvider(IDbContext dbContext) => _dbContext = dbContext;
    
    public Expression<Func<Todo, bool>> ByUserId(Guid userId)
        => todo => todo.UserId.Equals(userId);

    public Expression<Func<Todo, bool>> ByTitle(string title)
        => todo => todo.Title.Equals(title);

    public Expression<Func<Todo, bool>> ByTodoId(Guid todoId)
        => todo => todo.Id.Equals(todoId);

    public async Task<TResult> FindTodoByConditionAsync<TResult>
    (Expression<Func<Todo, bool>> condition, Func<IQueryable<Todo>, Task<TResult>> queryFunction,
        bool isUseTracking = false)
    {
        var query = isUseTracking
            ? _dbContext.Todos.AsTracking()
            : _dbContext.Todos.AsNoTracking();

        return await queryFunction(query.Where(condition));
    }
}