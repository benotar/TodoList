namespace TodoList.Domain.Enums;

public enum ErrorCode
{
    UserNotFound,
    UsernameAlreadyExists,
    UsernameIsRequired,
    PasswordIsRequired,
    UserIdNotValid,
    AuthenticationFailed,
    AuthenticationServiceUnavailable,
    TodoTitleMustNotBeEmpty,
    TodoAlreadyExists,
    TodoNotFound,
    DataIsTheSame,
    RefreshCookieNotFound,
    FingerprintCookieNotFound,
    InvalidRefreshToken,
    SessionNotFound,
    AccessDenied,
    InvalidModel,
    UnknownError
}