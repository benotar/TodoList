import {CreateTodo, UpdateTodo} from "@/types/models/request/TodoRequest.ts";
import {FetchTodoResponse} from "@/types/models/response/TodoResponse.ts";
import {Todo} from "@/types/entities/Todo.ts";

export type TodoState = {
    todos: FetchTodoResponse[];
    errorMessage: string | null;
    isLoadingTodo: boolean;
};

export type TodoActions = {
    fetchById: (todoId: string) => Promise<Todo | null>;
    fetchAll: () => Promise<boolean>;
    create: (by: CreateTodo) => Promise<boolean>;
    update: (by: UpdateTodo) => Promise<boolean>;
    remove: (todoId: string) => Promise<boolean>;
    toggle: (todoId: string) => Promise<boolean>;
    clearStore: () => void;
};


export type TodoSlice = TodoState & TodoActions;
