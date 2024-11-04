using Microsoft.AspNetCore.Mvc;

namespace TodoList.Application.Common;

public class CustomValidationProblemDetails : ProblemDetails
{
    public Dictionary<string, string[]> Errors { get; set; }
}