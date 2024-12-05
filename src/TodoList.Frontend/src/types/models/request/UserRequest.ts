import {Permission} from "@/types/store/Auth.ts";

type BaseType = {
    userName: string;
    password: string;
}

export type Login = BaseType & {
    fingerprint: string
};

export type Register = BaseType & {
    name: string;
};

export type UpdateUser = {
    userId: string;
    userName: string;
    name: string;
};

export type UpdatePermission = {
    userId: string;
    permission: Permission;
};