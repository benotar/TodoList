import {Login, Register} from "@/types/models/request/UserRequest.ts";
import {StoreApi} from "zustand";


export type AuthState = {
    isAuth: boolean;
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
    username: string;
    password: string;
    fingerprint: string;
};

export type SetAuthState = StoreApi<AuthSlice>['setState'];
