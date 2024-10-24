import {AuthSlice, AuthState, SetAuthState} from "@/types/store/Auth.ts";
import {create} from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware';
import {Login, Register} from "@/types/models/request/UserRequest.ts";
import authService from "@/services/authService.ts";
import {AxiosResponse} from "axios";
import {Result} from "@/types/models/response/Result.ts";

const initialAuthState: AuthState = {
    isAuth: false,
    token: null,
    errorMessage: null,
    isLoading: false
};


// const setCatchErrorMessage = (error: unknown): string => {
//     return error instanceof Error ? error.message : `an unexpected error occurred during request.`;
// }


const handleRequest = async<T>(
    set: SetAuthState,
    action: () => Promise<AxiosResponse<Result<T>>>,
    errorMessagePrefix: string,
): Promise<T | null> => {

    set({isLoading: true});

    try {

        const response = await action();

        if (!response.data.isSucceed) {

            const serverError = response.data.errorCode ?? 'unknown server error.';

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

        await handleRequest(set, () => authService.register(by),'Register');
    },

    login: async (by: Login): Promise<void> => {

        console.log('Login');

        const token = await handleRequest(set, () => authService.login(by), 'Login');

        if(token as string) {

            set({isAuth: true, token: token, errorMessage: null});
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

        if(token as string) {

            set({isAuth: true, token: token, errorMessage: null});
        }
    }
}), {
    name: 'auth-storage',
    storage: createJSONStorage(() => sessionStorage),
    partialize: state => ({isAuth: state.isAuth, token: state.token})
}));

// export const useAuthSlice = create<AuthSlice>()(persist((set) => ({
//     ...initialAuthState,
//
//     register: async (by: Register): Promise<void> => {
//
//         console.log('Register');
//
//         set({isLoading: true});
//
//         try {
//
//             const response = await authService.register(by);
//
//             if (!response.data.isSucceed) {
//
//                 const serverError = response.data.errorCode ?? 'unknown server error.';
//
//                 set({errorMessage: serverError});
//
//                 console.log('Request server error:', serverError);
//
//                 return;
//             }
//
//             console.log('Registration successful.');
//         } catch (error: unknown) {
//
//             const catchError = setCatchErrorMessage(error);
//
//             console.error('Request catch error: ', catchError);
//
//             set({errorMessage: catchError});
//         } finally {
//
//             set({isLoading: false});
//         }
//     },
//
//     login: async (by: Login): Promise<void> => {
//
//         console.log('Login');
//
//         set({isLoading: true});
//
//         try {
//
//             const response = await authService.login(by);
//
//             if (!response.data.isSucceed) {
//
//                 const serverError = response.data.errorCode ?? 'unknown server error.';
//
//                 set({errorMessage: serverError});
//
//                 console.log('Request server error:', serverError);
//
//                 return;
//             }
//
//             set({isAuth: true, token: response.data.data, errorMessage: null});
//
//             console.log('Login successful.');
//
//         } catch (error: unknown) {
//
//             const catchError = setCatchErrorMessage(error);
//
//             console.error('Request catch error: ', catchError);
//
//             set({errorMessage: catchError});
//
//         } finally {
//
//             set({isLoading: false});
//         }
//     },
//
//     logout: async (): Promise<void> => {
//
//         console.log('Logout');
//
//         set({isLoading: true});
//
//         try {
//
//             const response = await authService.logout();
//
//             if (!response.data.isSucceed) {
//
//                 const serverError = response.data.errorCode ?? 'unknown server error.';
//
//                 set({errorMessage: serverError});
//
//                 console.log('Request server error:', serverError);
//
//                 return;
//             }
//
//             set({isAuth: false, token: null, errorMessage: null});
//
//             console.log('Logout successful.');
//
//         } catch (error: unknown) {
//
//             const catchError = setCatchErrorMessage(error);
//
//             console.error('Request catch error: ', catchError);
//
//             set({errorMessage: catchError});
//
//         } finally {
//
//             set({isLoading: false});
//         }
//     },
//
//     refresh: async (): Promise<void> => {
//
//         console.log('Refresh');
//
//         set({isLoading: true});
//
//         try {
//
//             const response = await authService.refresh();
//
//             if (!response.data.isSucceed) {
//
//                 const serverError = response.data.errorCode ?? 'unknown server error.';
//
//                 set({errorMessage: serverError});
//
//                 console.log('Request server error:', serverError);
//
//                 return;
//             }
//
//             set({token: response.data.data});
//
//             console.log('Refresh successful.');
//
//         } catch (error: unknown) {
//
//             const catchError = setCatchErrorMessage(error);
//
//             console.error('Request catch error: ', catchError);
//
//             set({errorMessage: catchError});
//
//         } finally {
//
//             set({isLoading: false});
//         }
//     }
// }), {
//     name: 'auth-storage',
//     storage: createJSONStorage(() => sessionStorage),
//     partialize: state => ({isAuth: state.isAuth, token: state.token})
// }));