export type Result<TData> = {
    data: TData | null;
    errorCode: string | null;
    isSucceed: boolean;
};