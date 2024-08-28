using TodoList.Application;
using TodoList.Application.Common;
using TodoList.Application.Converters;
using TodoList.Persistence;
using TodoList.WebApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new SnakeCaseStringEnumConverter<ErrorCode>());
});

builder.AddCustomConfiguration();

builder.Services.AddApplication()
    .AddPersistence(builder.Configuration)
    .AddAuth(builder.Configuration);



builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => $"Welcome to the Home Page TodoList API!\nUTC Time: {DateTime.UtcNow}");

app.Run();