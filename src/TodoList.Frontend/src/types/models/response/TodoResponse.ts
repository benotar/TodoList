import {FetchUserResponse} from "@/types/models/response/UsersResponse.ts";

export type TodoCameFromServer = {
    todoId: string;
    user: FetchUserResponse;
    title: string;
    isCompleted: boolean;
}

export type FetchTodoAdminResponse = {
    todoId: string;
    userId: string;
    title: string;
    isCompleted: boolean;
}


export type FetchTodoResponse = {
    todoId: string;
    title: string;
    isCompleted: boolean;
}