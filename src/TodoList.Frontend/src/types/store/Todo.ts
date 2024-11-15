import {CreateTodo, UpdateTodo} from "@/types/models/request/TodoRequest.ts";
import {FetchTodoResponse} from "@/types/models/response/TodoResponse.ts";

export type TodoState = {
    todos: FetchTodoResponse[];
    errorMessage: string | null;
    isLoading: boolean;
};

export type TodoActions = {
    // fetchById: () => Promise<void>;
    fetchAll: () => Promise<void>;
    create: (by: CreateTodo) => Promise<void>;
    update: (by: UpdateTodo) => Promise<void>;
    delete: (todoId: string) => Promise<void>;
};


export type TodoSlice = TodoState & TodoActions;
