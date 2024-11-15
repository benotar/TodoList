import {AuthSlice} from "@/types/store/Auth.ts";
import {create} from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware';
import {Login, Register} from "@/types/models/request/UserRequest.ts";
import {LoginResponse, Result} from "@/types/models/response/AuthResponse.ts";
import $api from "@/common/axios.ts";
import {ENDPOINTS} from "@/common/endpoints.ts";
import {decodeJwt} from "@/common/jwt/decode.ts";

const initialAuthState: AuthSlice = {
    isAuth: false,
    permission: null,
    token: null,
    errorMessage: null,
    isLoading: false,
    register: async () => {},
    login: async () => {},
    logout: async () => {},
    refresh: async () => {},
};

export const useAuthStore = create<AuthSlice>()(persist((set) => ({
    ...initialAuthState,

    register: async (by: Register): Promise<void> => {

        console.log("Register");

        set({isLoading: true});

        const requestResult = await $api.post<Result<void>>(ENDPOINTS.AUTH.REGISTER, by);

        if (!requestResult?.data?.isSucceed) {
            set({errorMessage: requestResult?.data?.errorCode || "Register error."});
            return;
        }

        set({isLoading: false});
    },

    login: async (by: Login): Promise<void> => {

        console.log("Login");

        set({isLoading: true});

        const requestResult = await $api.post<Result<LoginResponse>>(ENDPOINTS.AUTH.LOGIN, by);

        if (!requestResult?.data?.isSucceed) {
            set({errorMessage: requestResult?.data?.errorCode || "Login error."});
            return;
        }

        const requestToken = requestResult.data?.data?.accessToken;

        if (requestToken) {
            const decodedJwt = decodeJwt(requestToken);
            set({permission: decodedJwt?.permission, token: requestToken, isAuth: true, errorMessage: null});
        }

        set({isLoading: false});
    },

    logout: async (): Promise<void> => {

        console.log("Logout");

        set({isLoading: true});

        const requestResult = await $api.post<Result<void>>(ENDPOINTS.AUTH.LOGOUT);

        if (!requestResult?.data?.isSucceed) {
            set({errorMessage: requestResult?.data?.errorCode || "Logout error."});
            return;
        }

        set({isAuth: false, token: null, errorMessage: null, permission: null});
    },

    refresh: async (): Promise<void> => {

        console.log("Refresh");

        set({isLoading: true});

        const requestResult = await $api.post<Result<LoginResponse>>(ENDPOINTS.TOKEN);

        if (!requestResult?.data?.isSucceed) {
            set({errorMessage: requestResult?.data?.errorCode || "Refresh error."});
            return;
        }

        const requestToken = requestResult.data?.data?.accessToken;

        if (requestToken) {
            const decodedJwt = decodeJwt(requestToken);
            set({permission: decodedJwt?.permission, token: requestToken, isAuth: true, errorMessage: null});
        }

        set({isLoading: false});
    }
}), {
    name: "auth-storage",
    version: 1,
    storage: createJSONStorage(() => sessionStorage)
}));