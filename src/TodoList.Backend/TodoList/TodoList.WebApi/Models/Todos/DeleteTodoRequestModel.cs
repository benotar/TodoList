﻿using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Todos;

public class DeleteTodoRequestModel
{
    [Required]
    public Guid TodoId { get; set; }
}