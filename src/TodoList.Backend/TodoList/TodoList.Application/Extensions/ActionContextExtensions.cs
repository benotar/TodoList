using Microsoft.AspNetCore.Mvc;

namespace TodoList.Application.Extensions;

public static class ActionContextExtensions
{
    public static Dictionary<string, string[]> GetErrors(this ActionContext context)
    {
        return context.ModelState
            .Where(kvp => kvp.Value.Errors.Any())
            .ToDictionary(kvp => kvp.Key.ToLowerFistLetter(),
                kvp => kvp.Value.Errors
                    .Select(error => error.ErrorMessage).ToArray());
    }
}