using Microsoft.AspNetCore.Mvc;

namespace TodoList.WebApi.Controllers;

// Parent class for all controllers
[Route("api/[controller]")]
[ApiController]
public class BaseController : ControllerBase
{
    
}