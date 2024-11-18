import {Login, Register} from "@/types/models/request/UserRequest.ts";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";

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
    register: (by: Register) => Promise<void>;
    login: (by: Login) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
    clearAuthAndSetErrorMessage: (errorCore: ErrorCode) => void;
    clearAuth: () => void;
};

export type AuthSlice = AuthState & AuthActions;

export type LoginValues = {
    userName: string;
    password: string;
    fingerprint: string;
};
