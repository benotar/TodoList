import {TodoSlice} from "@/types/store/Todo.ts";
import {create} from "zustand";
import {ENDPOINTS} from "@/common/endpoints.ts";
import {ErrorCode, Result} from "@/types/models/response/AuthResponse.ts";
import $api from "@/common/axios.ts";
import {FetchTodoResponse} from "@/types/models/response/TodoResponse.ts";
import {Todo} from "@/types/entities/Todo.ts";

const initState: TodoSlice = {
    todos: [],
    errorMessage: null,
    isLoading: false,
    fetchById: async (): Promise<Todo | null> => {
        return null;
    },
    fetchAll: async (): Promise<void> => {
    },
    create: async (): Promise<void> => {
    },
    update: async (): Promise<void> => {
    },
    delete: async (): Promise<void> => {
    },
    toggle: async (): Promise<void> => {
    },
    clearStore: (): void => {
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
                console.log("Todo Fetch All exception: ", error.message);
            }

            const {clearStore} = get();

            clearStore();

        } finally {
            set({isLoading: false});
        }
    },

    fetchById: async (todoId: string): Promise<Todo | null> => {

        console.log("Todo Fetch By Id");

        set({isLoading: true});

        try {
            const serverResponse = await $api.get<Result<Todo>>(ENDPOINTS.TODO.GET_BY_ID, {
                params: {id: todoId},
            });

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Fetch All failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                return null;
            }

            return serverResponseData.data;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Todo Fetch All exception: ", error.message);
            }

            const {clearStore} = get();

            clearStore();

            return null;
            
        } finally {
            set({isLoading: false});
        }
    },

    toggle: async (): Promise<void> => {

        console.log("Todo Toggle");

        set({isLoading: true});

        try {
            const serverResponse = await $api.get<Result<void>>(ENDPOINTS.TODO.TOGGLE);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Toggle failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                return;
            }

        } catch (error) {

            if (error instanceof Error) {
                console.log("Todo Toggle exception: ", error.message);
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