import axios, {AxiosInstance} from "axios";
import {BASE_URL} from "@/common/endpoints.ts";

export const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

