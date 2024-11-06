using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Interfaces.Persistence;

public interface IDbContext : IDisposable, IInfrastructure<IServiceProvider>
{
    DbSet<User> Users { get; set; }
    DbSet<Todo> Todos { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}