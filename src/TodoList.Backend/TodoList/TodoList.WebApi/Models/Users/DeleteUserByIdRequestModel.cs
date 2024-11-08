using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Users;

public class DeleteUserByIdRequestModel
{
    [Required]
    public Guid UserId { get; set; }
}