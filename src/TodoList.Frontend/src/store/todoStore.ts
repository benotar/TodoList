import {TodoSlice} from "@/types/store/Todo.ts";
import {create} from "zustand";
import {ENDPOINTS} from "@/common/endpoints.ts";
import {ErrorCode, Result} from "@/types/models/response/AuthResponse.ts";
import $api from "@/common/axios.ts";
import {FetchTodoResponse} from "@/types/models/response/TodoResponse.ts";

const initState: TodoSlice = {
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
    },
    clearStore: () => {
    }
};

export const useTodoStore = create<TodoSlice>((set, get) => ({
    ...initState,

    fetchAll: async (): Promise<void> => {

        console.log("Todo Fetch All");

        set({isLoading: true});

        try {
            const serverResponse = await $api.get<Result<FetchTodoResponse[]>>(ENDPOINTS.TODO.GET_TODOS);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Fetch All failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                return;
            }

            set({
                todos: serverResponseData.data
            });

        } catch (error) {

            if (error instanceof Error) {
                console.log("Log out exception: ", error.message);
            }

            const {clearStore} = get();

            clearStore();

        } finally {
            set({isLoading: false});
        }
    },

    clearStore: (): void => {
        set({
            ...initState
        });
    }
}));