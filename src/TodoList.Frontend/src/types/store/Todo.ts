import {CreateTodo, UpdateTodo} from "@/types/models/request/TodoRequest.ts";
import {Todo} from "@/types/entities/Todo.ts";

export type TodoState = {
    todos: Todo[];
    errorMessage: string | null;
    isLoading: boolean;
};

export type TodoActions = {
    get: () => Promise<void>;
    create: (by: CreateTodo) => Promise<void>;
    update: (by: UpdateTodo) => Promise<void>;
    delete: (todoId: string) => Promise<void>;
};


export type TodoSlice = TodoState & TodoActions;
