using System.Text.Json.Serialization;
using TodoList.Domain.Enums;

namespace TodoList.Domain.Entities.Database;

public class User : DatabaseEntity
{
    public string UserName { get; set; }
    
    public byte[] PasswordSalt { get; set; }
    
    public byte[] PasswordHash { get; set; }
    
    public string Name { get; set; }

    public Permission Permission { get; set; }

    [JsonIgnore] public ICollection<Todo> Todos { get; set; } = new List<Todo>();
}