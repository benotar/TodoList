namespace TodoList.WebApi.Models.Authentication;

public class RegisterRequestModel
{
    public string UserName { get; set; }

    public string Password { get; set; }

    public string Name { get; set; }
}