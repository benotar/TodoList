namespace TodoList.Domain.Enums;

public enum ErrorCode
{
    UserNotFound,
    UsernameAlreadyExists,
    UserNotSavedToDatabase,
    UsersTableIsEmpty,
    
    AuthenticationFailed,
    AuthenticationServiceUnavailable,
    
    UserIdNotValid,
    TitleMustNotBeEmpty,
    TodoNotSavedToDatabase,
    TodoAlreadyExists,
    
    UnknownError
}