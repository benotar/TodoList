using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TodoList.Domain.Entities.Database;

public abstract class DatabaseEntity
{
    [Key]
    [JsonPropertyOrder(0)]
    public Guid Id { get; set; } = Guid.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}