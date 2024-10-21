import {AuthSlice, AuthState} from "@/types/store/Auth.ts";
import {create} from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware';
import {Login, Register} from "@/types/models/request/UserRequest.ts";
import authService from "@/services/authService.ts";

const initialAuthState: AuthState = {
    isAuth: false,
    token: null,
    errorMessage: null,
    isLoading: false
};

const setCatchErrorMessage = (error: unknown, endpointType: string): string => {
    return error instanceof Error ? error.message : `an unexpected error occurred during ${endpointType}.`;
}

export const useAuthSlice = create<AuthSlice>()(persist((set) => ({
    ...initialAuthState,

    register: async (by: Register): Promise<void> => {

        console.log('Register');

        set({isLoading: true});

        try {

            const response = await authService.register(by);

            if (!response.data.isSucceed) {

                const notSucceedServerResponse = response.data.errorCode ?? 'unknown server error.';

                set({errorMessage: notSucceedServerResponse});

                console.log('not succeed server response:', notSucceedServerResponse);

                return;
            }

            console.log('Registration successful.');
        } catch (error: unknown) {

            const catchError = setCatchErrorMessage(error, 'registration');

            console.error('Registration error: ', catchError);

            set({errorMessage: catchError});
        } finally {

            set({isLoading: false});
        }
    },

    login: async (by: Login): Promise<void> => {

        console.log('Login');

        set({isLoading: true});

        try {

            const response = await authService.login(by);

            if (!response.data.isSucceed) {

                const notSucceedServerResponse = response.data.errorCode ?? 'unknown server error.';

                set({errorMessage: notSucceedServerResponse});

                console.log('not succeed server response:', notSucceedServerResponse);

                return;
            }

            set({isAuth: true, token: response.data.data, errorMessage: null});

            console.log('Login successful.');

        } catch (error: unknown) {

            const catchError = setCatchErrorMessage(error, 'login');

            console.error('Registration error: ', catchError);

            set({errorMessage: catchError});

        } finally {

            set({isLoading: false});
        }
    },

    logout: async (): Promise<void> => {

        console.log('Logout');

        set({isLoading: true});

        try {

            const response = await authService.logout();

            if (!response.data.isSucceed) {

                const notSucceedServerResponse = response.data.errorCode ?? 'unknown server error.';

                set({errorMessage: notSucceedServerResponse});

                console.log('not succeed server response:', notSucceedServerResponse);

                return;
            }

            set({isAuth: false, token: null, errorMessage: null});

            console.log('Logout successful.');

        } catch (error: unknown) {

            const catchError = setCatchErrorMessage(error, 'logout');

            console.error('Registration error: ', catchError);

            set({errorMessage: catchError});

        } finally {

            set({isLoading: false});
        }
    },

    refresh: async (): Promise<void> => {

        console.log('Refresh');

        set({isLoading: true});

        try {

            const response = await authService.refresh();

            if (!response.data.isSucceed) {

                const notSucceedServerResponse = response.data.errorCode ?? 'unknown server error.';

                set({errorMessage: notSucceedServerResponse});

                console.log('not succeed server response:', notSucceedServerResponse);

                return;
            }

            set({token: response.data.data});

            console.log('Refresh successful.');

        } catch (error: unknown) {

            const catchError = setCatchErrorMessage(error, 'refresh');

            console.error('Registration error: ', catchError);

            set({errorMessage: catchError});

        } finally {

            set({isLoading: false});
        }
    }
}), {
    name: 'auth-storage',
    storage: createJSONStorage(() => sessionStorage)
}));