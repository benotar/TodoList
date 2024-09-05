using TodoList.Application.Interfaces.Services;

namespace TodoList.WebApi.Controllers;

public class TodoController : BaseController
{
    private readonly ITodoService _todoService;

    public TodoController(ITodoService todoService)
    {
        _todoService = todoService;
    }
}

    