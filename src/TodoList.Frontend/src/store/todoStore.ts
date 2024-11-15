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

        set({isLoading: true});

        const requestResult = await $api.get<Result<FetchTodoResponse[]>>(ENDPOINTS.TODO.GET_TODOS);

        if (!requestResult?.data?.isSucceed) {
            set({errorMessage: requestResult?.data?.errorCode || "Fetch Todos error."});
            return;
        }

        set({todos: requestResult.data.data!});

        set({isLoading: false});
    }
}));