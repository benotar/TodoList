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
    TodoDataIsTheSame,
    RefreshCookieNotFound,
    FingerprintCookieNotFound,
    InvalidRefreshToken,
    SessionNotFound,
    AccessDenied,
    InvalidModel,
    UnknownError
}