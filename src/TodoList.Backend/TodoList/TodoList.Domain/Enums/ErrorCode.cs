namespace TodoList.Domain.Enums;

public enum ErrorCode
{
    UserNotFound,
    UsernameAlreadyExists,
    UserNotSavedToDatabase,
    UserIdNotValid,
    
    AuthenticationFailed,
    AuthenticationServiceUnavailable,
    
   
    TodoTitleMustNotBeEmpty,
    TodoNotSavedToDatabase,
    TodoAlreadyExists,
    TodoNotFound,
    TodoDataIsTheSame,
    
    
    RefreshCookieNotFound,
    FingerprintCookieNotFound,
    InvalidRefreshToken,
    SessionNotFound,
    
    UnknownError
}