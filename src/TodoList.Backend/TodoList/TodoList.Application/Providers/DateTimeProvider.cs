using TodoList.Application.Interfaces.Providers;

namespace TodoList.Application.Providers;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}