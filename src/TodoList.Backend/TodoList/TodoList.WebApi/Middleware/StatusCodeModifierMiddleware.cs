using System.Text.Json;

namespace TodoList.WebApi.Middleware;

public class StatusCodeModifierMiddleware
{
    private readonly RequestDelegate _next;

    public StatusCodeModifierMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var originalBodyStream = context.Response.Body;

        using (var newBodyStream = new MemoryStream())
        {
            context.Response.Body = newBodyStream;

            try
            {
                await _next.Invoke(context);

                newBodyStream.Seek(0, SeekOrigin.Begin);

                var responseBody = await new StreamReader(newBodyStream).ReadToEndAsync();

                newBodyStream.Seek(0, SeekOrigin.Begin);

                using (var jsonDocument = JsonDocument.Parse(responseBody))
                {
                    if (jsonDocument.RootElement.TryGetProperty("statusCode", out var statusCodeProperty)
                        && statusCodeProperty.ValueKind == JsonValueKind.Number)
                    {
                        var statusCode = statusCodeProperty.GetInt32();

                        if (statusCode != context.Response.StatusCode)
                        {
                            context.Response.StatusCode = statusCode;
                        }
                    }
                }

                await newBodyStream.CopyToAsync(originalBodyStream);
            }
            catch (JsonException)
            {
                await newBodyStream.CopyToAsync(originalBodyStream);
            }
            finally
            {
                context.Response.Body = originalBodyStream;
            }
        }
    }
}

public static class StatusCodeModifierMiddlewareExtensions
{
    public static IApplicationBuilder UseStatusCodeModifier(this IApplicationBuilder app)
        => app.UseMiddleware<StatusCodeModifierMiddleware>();
}