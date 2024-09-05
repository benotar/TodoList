namespace TodoList.Domain.Enums;

public enum ErrorCode
{
    UserNotFound,
    UsernameAlreadyExists,
    UserNotSavedToDatabase,
    UsersTableIsEmpty,
    
    AuthenticationFailed,
    AuthenticationServiceUnavailable,
    
    CannotGetUserId,
    
    UnknownError
}