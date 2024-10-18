export type Result<TData> = {
    data?: TData;
    errorCode?: string;
    isSucceed: boolean;
};