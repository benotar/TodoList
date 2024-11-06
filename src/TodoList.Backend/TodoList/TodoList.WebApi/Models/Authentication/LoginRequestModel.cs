using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Authentication;

public class LoginRequestModel
{
    [Required] 
    [MinLength(3, ErrorMessage = "Username is too short.")]
    public string Username { get; set; }
    
    [Required]
    public string Password { get; set; }
    
    [Required]
    [Compare("Password", ErrorMessage = "The password does not match.")] 
    public string ConfirmPassword { get; set; }
    
    [Required] 
    public string Fingerprint { get; set; }
}