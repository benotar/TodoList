namespace TodoList.Domain.Entities.Database;

public abstract class DatabaseEntity
{
    public Guid Id { get; set; } = Guid.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}