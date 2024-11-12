export type Result<TData> = {
    data: TData | null;
    errorCode: string | null;
    isSucceed: boolean;
};

export type LoginResponse = {
    accessToken: string | null;
}