import {TodoSlice} from "@/types/store/Todo.ts";
import {create} from "zustand";
import {ENDPOINTS} from "@/common/endpoints.ts";
import {Result} from "@/types/models/response/AuthResponse.ts";
import $api from "@/common/axios.ts";
import {FetchTodoResponse} from "@/types/models/response/TodoResponse.ts";

const initialTodoState: TodoSlice = {
    todos: [],
    errorMessage: null,
    isLoading: false,
    // fetchById: async () => {},
    fetchAll: async () => {
    },
    create: async () => {
    },
    update: async () => {
    },
    delete: async () => {
    }
};

export const useTodoStore = create<TodoSlice>((set) => ({
    ...initialTodoState,

    fetchAll: async (): Promise<void> => {

        console.log("Todo fetchAll");

        set({...initialTodoState, isLoading: true});

        try {
            const requestResult = await $api.get<Result<FetchTodoResponse[]>>(ENDPOINTS.TODO.GET_TODOS);

            if (!requestResult?.data?.isSucceed) {
                set({...initialTodoState, errorMessage: requestResult?.data?.errorCode || "Fetch Todos error."});
                return;
            }

            set({...initialTodoState, todos: requestResult.data.data!});

        } catch (error: unknown) {

            console.log("Error in todos fetch: ", error);

            set({...initialTodoState, errorMessage: error.message})
        }
    }
}));