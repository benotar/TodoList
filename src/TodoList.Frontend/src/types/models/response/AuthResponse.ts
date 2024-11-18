export enum ErrorCode {
    InvalidCredentials = "Invalid Credentials",
    UserNotFound = "User Not Found",
    UsernameAlreadyExists = "Username Already Exists",
    UsernameIsRequired = "Username Is Required",
    PasswordIsRequired = "Password Is Required",
    UserIdNotValid = "User Id Not Valid",
    AuthenticationFailed = "Authentication Failed",
    RegisterFailed = "Register Failed",
    AuthenticationServiceUnavailable = "Authentication Service Unavailable",
    TodoTitleMustNotBeEmpty = "Todo Title Must Not Be Empty",
    TodoAlreadyExists = "Todo Already Exists",
    TodoNotFound = "Todo Not Found",
    DataIsTheSame = "Data Is The Same",
    RefreshCookieNotFound = "Refresh Cookie Not Found",
    FingerprintCookieNotFound = "Fingerprint Cookie Not Found",
    InvalidRefreshToken = "Invalid Refresh Token",
    SessionNotFound = "Session Not Found",
    AccessDenied = "Access Denied",
    InvalidModel = "Invalid Model",
    UnknownError = "Unknown Error",
    RequestFailed = "Request Failed"
}

export type Result<TData> = {
    data: TData | null;
    errorCode: ErrorCode | null;
    isSucceed: boolean;
};

export type LoginResponse = {
    accessToken: string | null;
}

export type RefreshResponse = {
    accessToken: string | null;
}