using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using TodoList.Domain.Entities;

namespace TodoList.Application.Interfaces;

public interface IDbContext : IDisposable, IInfrastructure<IServiceProvider>
{
    public DbSet<User> Users { get; set; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}