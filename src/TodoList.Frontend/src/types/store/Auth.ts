import {Login, Register} from "@/types/models/request/UserRequest.ts";

export type State = {
    isAuth: boolean;
    token: string | null;
    errorCode: string | null;
};

export type Actions = {
    register: (by: Register) => Promise<void>;
    login: (by: Login) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
};

export type AuthSlice = State & Actions;