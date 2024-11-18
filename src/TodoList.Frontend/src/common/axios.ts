import axios, {AxiosInstance} from "axios";
import {BASE_URL} from "@/common/endpoints.ts";
import {useAuthStore} from "@/store/authStore.ts";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";

const $api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

$api.interceptors.request.use(config => {

    console.log("Interceptor request.");

    const {token} = useAuthStore.getState();

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {

    return Promise.reject(error);
});

$api.interceptors.response.use(response => response,


    async error => {

        console.log("Interceptor response error.");

        const originalRequest = error.config;

        const errorResponse = error.response;

        if (!errorResponse) {

            console.error("The request did not reach the server or the server did not respond.");

            return Promise.reject(error);
        }

        if (errorResponse.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            try {
                const refresh = useAuthStore.getState().refresh;

                await refresh();

                const token = useAuthStore.getState().token;

                if (token) {

                    originalRequest.headers.Authorization = `Bearer ${token}`;
                }

                const errorMessage = useAuthStore.getState().errorMessage;

                if (errorMessage && errorMessage === ErrorCode.InvalidRefreshToken) {

                    const logout = useAuthStore.getState().logout;

                    await logout();

                    return Promise.reject(new Error(errorMessage));
                }

                return $api(originalRequest);

            } catch (refreshError: unknown) {

                const refreshErrorMessage = refreshError instanceof Error ? error.message : "An unexpected error occurred during refreshing token.";

                console.error("Error refreshing token:", refreshErrorMessage);

                const logout = useAuthStore.getState().logout;

                await logout();

                return Promise.reject(new Error(refreshErrorMessage));
            }
        }
    });

export default $api;