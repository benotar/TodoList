import {Login, Register} from "@/types/models/request/UserRequest.ts";
import {ErrorCode} from "@/types/models/response/Errors.ts";

export enum Permission {
    Advanced = "Advanced",
    Basic = "Basic"
}

export type AuthState = {
    isAuth: boolean;
    permission: string | null;
    token: string | null;
    errorMessage: ErrorCode | null;
    isLoading: boolean;
};

export type AuthActions = {
    register: (by: Register) => Promise<boolean>;
    login: (by: Login) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
    clearAuthAndSetErrorMessage: (errorCore: ErrorCode) => void;
    clearAuth: () => void;
};

export type AuthSlice = AuthState & AuthActions;

export type AuthValues = {
    userName: string;
    password: string;
}

export type LoginValues = AuthValues & {
    fingerprint: string;
};

export type RegisterValues = AuthValues & {
    name: string;
}