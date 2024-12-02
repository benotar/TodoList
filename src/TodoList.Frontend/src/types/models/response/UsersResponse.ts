import {Permission} from "@/types/store/Auth.ts";

export type FetchUserResponse = {
    userId: string,
    userName: string,
    name: string,
    permission: Permission
};