import {CreateTodo, UpdateTodo} from "@/types/models/request/TodoRequest.ts";
import {FetchTodoResponse} from "@/types/models/response/TodoResponse.ts";
import {Todo} from "@/types/entities/Todo.ts";

export type TodoState = {
    todos: FetchTodoResponse[];
    errorMessage: string | null;
    isLoading: boolean;
};

export type TodoActions = {
    fetchById: (todoId: string) => Promise<Todo | null>;
    fetchAll: () => Promise<void>;
    create: (by: CreateTodo) => Promise<void>;
    update: (by: UpdateTodo) => Promise<void>;
    delete: (todoId: string) => Promise<void>;
    toggle: (todoId: string) => Promise<boolean>;
    clearStore: () => void;
};


export type TodoSlice = TodoState & TodoActions;
