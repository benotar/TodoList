namespace TodoList.Application.Common;

public enum ErrorCode
{
    UserNotFound,
    UsernameAlreadyExists,
    UserNotAddedToDatabase,
    UserNotSavedToDatabase,
    AuthenticationFailed,
    
    UsersTableIsEmpty,
    
    Unknown
}