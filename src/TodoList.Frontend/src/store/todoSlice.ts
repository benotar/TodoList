import {TodoState, TodoSlice} from "@/types/store/Todo.ts";
import {create} from "zustand";
import {CreateTodo, UpdateTodo} from "@/types/models/request/TodoRequest.ts";

const initialState: TodoState = {
    errorMessage: null,
    isLoading: false
};

export const useTodoSlice = create<TodoSlice>((set) => ({
    ...initialState,

    get: async (todoId: string): Promise<void> => {
    },
    create: async (request: CreateTodo): Promise<void> => {
    },
    update: async (request: UpdateTodo): Promise<void> => {
    },
    delete: async (todoId: string): Promise<void> => {
    }
}));