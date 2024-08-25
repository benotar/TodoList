using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Interfaces.Providers.Persistence;

public interface IDbContext : IDisposable, IInfrastructure<IServiceProvider>
{
    public DbSet<User> Users { get; set; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}