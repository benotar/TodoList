using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TodoList.Domain.Entities.Database;

public class User : DatabaseEntity
{
    public string Username { get; set; }
    
    public byte[] PasswordSalt { get; set; }
    
    public byte[] PasswordHash { get; set; }
    
    public string Name { get; set; }
    
    [JsonIgnore] public ICollection<Todo> Todos { get; set; } = new List<Todo>();
}