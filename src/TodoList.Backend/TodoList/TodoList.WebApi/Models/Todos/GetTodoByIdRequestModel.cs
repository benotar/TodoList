using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Todos;

public class GetTodoByIdRequestModel
{
    [Required]
    public Guid TodoId { get; set; }
}