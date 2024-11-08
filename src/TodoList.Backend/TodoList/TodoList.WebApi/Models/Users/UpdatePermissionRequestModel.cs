using System.ComponentModel.DataAnnotations;
using TodoList.Domain.Enums;
using TodoList.WebApi.Infrastructure.Validation;

namespace TodoList.WebApi.Models.Users;

public class UpdatePermissionRequestModel
{
    
    [Required] public Guid UserId { get; set; }

    [RequiredEnum(ErrorMessage = "Permission is required and must be a valid enum value.")] 
    public Permission Permission { get; set; }
}