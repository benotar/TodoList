import {AuthSlice, AuthState} from "@/types/store/Auth.ts";
import {create} from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware';
import {Login, Register} from "@/types/models/request/UserRequest.ts";
import {LoginResponse, RefreshResponse, Result} from "@/types/models/response/AuthResponse.ts";
import $api from "@/common/axios.ts";
import {ENDPOINTS} from "@/common/endpoints.ts";
import {decodeJwt} from "@/common/jwt/decode.ts";
import {ErrorCode} from "@/types/models/response/Errors.ts";

const initState: AuthState = {
    isAuth: false,
    permission: null,
    token: null,
    errorMessage: null,
    isLoading: false,
};

export const useAuthStore = create<AuthSlice>()(persist((set, get) => ({
    ...initState,

    register: async (by: Register): Promise<void> => {

        console.log("Register");

        set({isLoading: true});

        try {
            const serverResponse = await $api.post<Result<void>>(ENDPOINTS.AUTH.REGISTER, by);

            const serverResponseData = serverResponse?.data;

            if (!serverResponseData || !serverResponseData.isSucceed) {

                console.log("Register failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                const {clearAuthAndSetErrorMessage} = get();

                clearAuthAndSetErrorMessage(ErrorCode.RegisterFailed);

                return;
            }
        } catch (error) {

            if (error instanceof Error) {
                console.log("Register exception: ", error.message);
            }

            const {clearAuthAndSetErrorMessage} = get();

            clearAuthAndSetErrorMessage(ErrorCode.UnknownError);

        } finally {
            set({isLoading: false});
        }
    },

    login: async (by: Login): Promise<void> => {

        console.log("Login");

        set({isLoading: true});

        try {
            const serverResponse = await $api.post<Result<LoginResponse>>(ENDPOINTS.AUTH.LOGIN, by);

            const serverResponseData = serverResponse?.data;

            if (!serverResponseData || !serverResponseData.isSucceed) {

                console.log("Login failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                const {clearAuthAndSetErrorMessage} = get();

                clearAuthAndSetErrorMessage(ErrorCode.AuthenticationFailed);

                return;
            }

            const accessToken = serverResponseData.data?.accessToken;

            if (accessToken) {

                const decodedJwt = decodeJwt(accessToken);

                set({...initState, token: accessToken, permission: decodedJwt?.permission, isAuth: true});
            }
        } catch (error) {

            if (error instanceof Error) {
                console.log("Login exception: ", error.message);
            }

            const {clearAuthAndSetErrorMessage} = get();

            clearAuthAndSetErrorMessage(ErrorCode.UnknownError);

        } finally {
            set({isLoading: false});
        }
    },

    logout: async (): Promise<void> => {

        console.log("Logout");

        set({isLoading: true});

        try {
            const serverResponse = await $api.post<Result<void>>(ENDPOINTS.AUTH.LOGOUT);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed) {

                console.log("Log out failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);
            }

            const {clearAuth} = get();

            clearAuth();

        } catch (error) {

            if (error instanceof Error) {
                console.log("Log out exception: ", error.message);
            }

            const {clearAuth} = get();

            clearAuth();

        } finally {
            set({isLoading: false});
        }
    },

    refresh: async (): Promise<void> => {

        console.log("Refresh");

        set({isLoading: true});

        try {
            const serverResponse = await $api.post<Result<RefreshResponse>>(ENDPOINTS.TOKEN);

            const serverResponseData = serverResponse?.data;

            if (!serverResponseData || !serverResponseData.isSucceed) {

                console.log("Refresh failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                const {clearAuthAndSetErrorMessage} = get();

                clearAuthAndSetErrorMessage(ErrorCode.AuthenticationFailed);

                return;
            }

            const accessToken = serverResponseData.data?.accessToken;

            if (accessToken) {
                const decodedJwt = decodeJwt(accessToken);
                set({...initState, token: accessToken, permission: decodedJwt?.permission, isAuth: true});
            }
        } catch (error) {

            if (error instanceof Error) {
                console.log("Refresh exception: ", error.message);
            }

            const {clearAuthAndSetErrorMessage} = get();

            clearAuthAndSetErrorMessage(ErrorCode.UnknownError);

        } finally {
            set({isLoading: false});
        }
    },

    clearAuthAndSetErrorMessage: (errorCore: ErrorCode): void => {
        set({
            ...initState,
            errorMessage: errorCore
        });
    },

    clearAuth: (): void => {
        set({
            ...initState
        });
    }
}), {
    name: "auth-storage",
    version: 1,
    storage: createJSONStorage(() => sessionStorage),
    partialize: (state) => ({isAuth: state.isAuth, permission: state.permission})
}));