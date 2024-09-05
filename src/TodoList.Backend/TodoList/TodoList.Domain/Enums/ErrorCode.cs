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
    TodoTableIsEmpty,
    DataIsTheSame,
    TodoNotFound,
    
    UnknownError
}