import axios, {AxiosInstance} from "axios";
import {BASE_URL} from "@/common/endpoints.ts";
import {useAuthSlice} from "@/store/authSlice.ts";

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(config => {

    console.log('interceptor request.');

    const {token} = useAuthSlice.getState();

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {

    return Promise.reject(error);
});

api.interceptors.response.use(response => response, async error => {

    console.log('interceptor response.');

    const originalRequest = error.config;

    const errorResponse = error.response;

    if(!error){

        console.error('the request did not reach the server or the server did not respond.');

        return Promise.reject(error);
    }

    if(errorResponse.status === 401 && !originalRequest._retry) {

        try{
            const {refresh} = useAuthSlice.getState();

            await refresh();

            // TODO if need

            return api(originalRequest);
        } catch (refreshError: unknown){

            const refreshErrorMessage = refreshError instanceof Error ? error.message : `an unexpected error occurred during refreshing token.`;

            console.error('Error refreshing token:', refreshErrorMessage);

            const {logout} = useAuthSlice.getState();

            await logout();

            return Promise.reject(error);
        }
    }
});

export default api;