using System.Text.Json.Serialization;

namespace TodoList.Domain.Entities.Database;

public class User : DatabaseEntity
{
    public string Username { get; set; }
    
    public byte[] PasswordSalt { get; set; }

    public byte[] PasswordHash { get; set; }

    public string? Name { get; set; }
    
    [JsonIgnore] public ICollection<Todo> Todoes { get; set; } = new List<Todo>();
}