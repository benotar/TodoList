namespace TodoList.Domain.Enums;

public enum ErrorCode
{
    UserNotFound,
    UsernameAlreadyExists,
   
    UserIdNotValid,
    
    AuthenticationFailed,
    AuthenticationServiceUnavailable,
    
   
    TodoTitleMustNotBeEmpty,
    TodoAlreadyExists,
    TodoNotFound,
    TodoDataIsTheSame,
    
    
    RefreshCookieNotFound,
    FingerprintCookieNotFound,
    InvalidRefreshToken,
    SessionNotFound,
    
    DataNotSavedToDatabase,
    
    UnknownError
}