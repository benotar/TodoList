import {ErrorCode} from "@/types/models/response/Errors.ts";

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