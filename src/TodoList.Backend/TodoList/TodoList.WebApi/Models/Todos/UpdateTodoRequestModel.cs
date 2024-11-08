using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Todos;

public class UpdateTodoRequestModel
{
    [Required]
    public Guid TodoId { get; set; }
    
    [Required] 
    [MinLength(3, ErrorMessage = $"{nameof(Title)} is too short")]
    public string Title { get; set; }
    
    [Required]
    public bool IsCompleted { get; set; }
}