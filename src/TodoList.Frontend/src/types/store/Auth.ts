import {Login, Register} from "@/types/models/request/UserRequest.ts";

export enum Permission {
    Advanced = "Advanced",
    Basic = "Basic"
}

export type AuthState = {
    isAuth: boolean;
    permission: string | null;
    token: string | null;
    errorMessage: string | null;
    isLoading: boolean;
};

export type AuthActions = {
    register: (by: Register) => Promise<void>;
    login: (by: Login) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
};

export type AuthSlice = AuthState & AuthActions;

export type LoginValues = {
    userName: string;
    password: string;
    fingerprint: string;
};

