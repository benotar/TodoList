import {Result} from "@/types/models/response/Result.ts";
import {User} from "@/types/entities/User.tsx";
import {Login, Register} from "@/types/models/request/UserRequest.ts";

export type State = {
    isAuth: boolean;
    errorCode?: string;
    token: string | null;
};

export type Action = {
    register: (params: Register) => Promise<Result<User>>;
    login: (params: Login) => Promise<Result<string>>;
    logout: () => Promise<Result<void>>;
    refresh: () => Promise<Result<string>>;
};