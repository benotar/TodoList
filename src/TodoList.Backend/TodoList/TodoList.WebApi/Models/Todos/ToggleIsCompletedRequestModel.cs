using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Todos;

public class ToggleIsCompletedRequestModel
{
    [Required]
    public Guid TodoId { get; set; }
}