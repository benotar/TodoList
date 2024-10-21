import {TodoState, TodoSlice} from "@/types/store/Todo.ts";
import {create} from "zustand";

const initialState: TodoState = {

};

export const useTodoSlice = create<TodoSlice>((set) => ({
    ...initialState,
}));