import {Login, Register} from "@/types/models/request/UserRequest.ts";
import {Result} from "@/types/models/response/Result.ts";
import {User} from "@/types/entities/User.ts";
import {AxiosResponse} from "axios";
import api from "@/common/axios.ts";
import {ENDPOINTS} from "@/common/endpoints.ts";

const authService = {
    register: async (by: Register): Promise<AxiosResponse<Result<User>>> => {
        return await api.post<Result<User>>(ENDPOINTS.AUTH.REGISTER, by);
    },
    login: async (by: Login): Promise<AxiosResponse<Result<string>>> => {
        return await api.post<Result<string>>(ENDPOINTS.AUTH.LOGIN, by);
    },
    logout: async (): Promise<AxiosResponse<Result<void>>> => {
        return await api.post<Result<void>>(ENDPOINTS.AUTH.LOGOUT);
    },
    refresh: async (): Promise<AxiosResponse<Result<string>>> => {
        return await api.post<Result<string>>(ENDPOINTS.TOKEN);
    }
};

export default authService;