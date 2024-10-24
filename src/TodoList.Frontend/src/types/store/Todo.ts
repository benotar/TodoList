import {CreateTodo, UpdateTodo} from "@/types/models/request/TodoRequest.ts";

export type TodoState = {
    errorMessage: string | null;
    isLoading: boolean;
};

export type TodoActions = {
    get: (todoId: string) => Promise<void>;
    create: (request: CreateTodo) => Promise<void>;
    update: (request: UpdateTodo) => Promise<void>;
    delete: (todoId: string) => Promise<void>;
};


export type TodoSlice = TodoState & TodoActions;
