namespace TodoList.WebApi.Models.Authentication;

public class RegisterRequestModel
{
    public string Username { get; set; }

    public string Password { get; set; }

    public string Name { get; set; }
}