using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Authentication;

public class RegisterRequestModel
{
    [Required(ErrorMessage = "Username is required.")]
    [StringLength(20, MinimumLength = 3,
        ErrorMessage = "Username must be between 3 and 20")]
    public string Username { get; set; }

    [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8}$")]
    public string Password { get; set; }
    
    [Required(ErrorMessage = "Name is required")]
    [StringLength(50, ErrorMessage = "Name cannot be longer than 50 characters.")]
    public string Name { get; set; }
}