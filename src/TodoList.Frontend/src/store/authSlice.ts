import {AuthSlice, AuthState, SetAuthState} from "@/types/store/Auth.ts";
import {create} from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware';
import {Login, Register} from "@/types/models/request/UserRequest.ts";
import authService from "@/services/authService.ts";
import {AxiosResponse} from "axios";
import {LoginResponse, Result} from "@/types/models/response/Result.ts";
import {jwtDecode} from "jwt-decode";
import {Permission} from '@/types/store/Auth';

const initialAuthState: AuthState = {
    isAuth: false,
    permission: null,
    token: null,
    errorMessage: null,
    isLoading: false
};

const handleRequest = async <T>(
    set: SetAuthState,
    action: () => Promise<AxiosResponse<Result<T>>>,
    errorMessagePrefix: string,
): Promise<T | null> => {
    set({isLoading: true});
    try {
        const response = await action();

        if (!response.data.isSucceed) {
            const serverError = response.data.errorCode ?? 'Unknown server error.';
            set({errorMessage: serverError});
            console.log(`${errorMessagePrefix} failed: `, serverError);
            return null;
        }

        console.log(`${errorMessagePrefix} successful.`);

        return response.data.data;
    } catch (error: unknown) {
        const catchError = error instanceof Error ? error.message : `Unexpected error.`;
        console.error(`${errorMessagePrefix} catch error :`, catchError);
        set({errorMessage: catchError});
        return null;
    } finally {
        set({isLoading: false});
    }
};

export const useAuthSlice = create<AuthSlice>()(persist((set) => ({
    ...initialAuthState,
    register: async (by: Register): Promise<void> => {
        console.log('Register');
        await handleRequest(set, () => authService.register(by), 'Register');
    },
    login: async (by: Login): Promise<void> => {

        console.log('Login');

        const loginResult: LoginResponse = await handleRequest(set, () => authService.login(by), 'Login');

        if (loginResult) {

            set({isAuth: true, token: loginResult.accessToken, errorMessage: null});

            const decodedToken: {permission: Permission} = jwtDecode(token);
            set({permission: decodedToken.permission});
        }
    },
    logout: async (): Promise<void> => {
        console.log('Logout');
        await handleRequest(set, () => authService.logout(), 'Logout');
        set({isAuth: false, token: null, errorMessage: null});
    },
    refresh: async (): Promise<void> => {
        console.log('Refresh');
        const token = await handleRequest(set, () => authService.refresh(), 'Refresh');
        if (token as string) {
            set({isAuth: true, token: token, errorMessage: null});
        }
    }
}), {
    name: 'auth-storage',
    storage: createJSONStorage(() => sessionStorage),
    partialize: state => ({isAuth: state.isAuth, token: state.token})
}));