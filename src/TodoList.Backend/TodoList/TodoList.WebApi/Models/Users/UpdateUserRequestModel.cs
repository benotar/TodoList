using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Users;

public class UpdateUserRequestModel
{
    [Required] public Guid UserId { get; set; }

    [Required]
    [MinLength(3, ErrorMessage = $"{nameof(UserName)} is too short")]
    public string UserName { get; set; }

    [Required]
    [MinLength(3, ErrorMessage = $"{nameof(Name)} is too short")]
    public string Name { get; set; }
}