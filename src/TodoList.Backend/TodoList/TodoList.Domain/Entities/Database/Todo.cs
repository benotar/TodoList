using System.Text.Json.Serialization;

namespace TodoList.Domain.Entities.Database;

public class Todo : DatabaseEntity
{
    public Guid UserId { get; set; }
    
    public string Title { get; set; }
    
    public string? Description { get; set; }

    [JsonIgnore] public User User { get; set; }
}