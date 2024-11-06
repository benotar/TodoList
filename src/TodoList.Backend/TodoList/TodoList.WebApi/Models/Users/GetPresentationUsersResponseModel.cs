namespace TodoList.WebApi.Models.Users;

public record GetPresentationUsersResponseModel(
    Guid UserId,
    string Username,
    string Name
);