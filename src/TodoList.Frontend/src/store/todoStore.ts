import {TodoSlice} from "@/types/store/Todo.ts";
import {create} from "zustand";
import {ENDPOINTS} from "@/common/endpoints.ts";
import {ErrorCode, Result} from "@/types/models/response/AuthResponse.ts";
import $api from "@/common/axios.ts";
import {FetchTodoResponse} from "@/types/models/response/TodoResponse.ts";
import {Todo} from "@/types/entities/Todo.ts";
import {CreateTodo, UpdateTodo} from "@/types/models/request/TodoRequest.ts";

const initState: TodoSlice = {
    todos: [],
    errorMessage: null,
    isLoadingTodo: false,
    fetchById: async (): Promise<Todo | null> => {
        return null;
    },
    fetchAll: async (): Promise<boolean> => false,
    create: async (): Promise<boolean> => false,
    update: async (): Promise<boolean> => false,
    remove: async (): Promise<boolean> => false,
    toggle: async (): Promise<boolean> => false,
    clearStore: (): void => {
    }
};

export const useTodoStore = create<TodoSlice>((set, get) => ({
    ...initState,

    fetchAll: async (): Promise<boolean> => {

        console.log("Todo Fetch All");

        set({isLoadingTodo: true});

        try {
            const serverResponse = await $api.get<Result<FetchTodoResponse[]>>(ENDPOINTS.TODO.GET_TODOS);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Fetch All failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                set({
                    errorMessage: `Fetch All Todos ${ErrorCode.RequestFailed}`
                });

                return false;
            }

            set({
                todos: serverResponseData.data
            });

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Todo Fetch All exception: ", error.message);
            }

            const {clearStore} = get();

            clearStore();

            return false;

        } finally {
            set({isLoadingTodo: false});
        }
    },

    create: async (by: CreateTodo): Promise<boolean> => {

        console.log("Todo Create");

        set({isLoadingTodo: true});

        try {
            const serverResponse = await $api.post<Result<void>>(ENDPOINTS.TODO.CREATE, by);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Create failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                if (serverResponseData.errorCode === ErrorCode.TodoAlreadyExists) {

                    set({
                        errorMessage: serverResponseData.errorCode
                    });

                    return false;
                }

                set({
                    errorMessage: ErrorCode.RequestFailed
                });

                return false;
            }

            set({
                todos: serverResponseData.data
            });

            await get().fetchAll();

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Todo Create exception: ", error.message);
            }

            return false;

        } finally {
            set({isLoadingTodo: false});
        }
    },

    fetchById: async (todoId: string): Promise<Todo | null> => {

        console.log("Todo Fetch By Id");

        set({isLoadingTodo: true});

        try {
            const serverResponse = await $api.get<Result<Todo>>(ENDPOINTS.TODO.GET_BY_ID(todoId));

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Fetch By Id failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                return null;
            }

            return serverResponseData.data;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Todo Fetch By Id exception: ", error.message);
            }

            return null;

        } finally {
            set({isLoadingTodo: false});
        }
    },

    update: async (by: UpdateTodo): Promise<boolean> => {

        console.log("Todo Update");

        set({
            isLoadingTodo: true
        });

        try {

            const serverResponse = await $api.put<Result<void>>(ENDPOINTS.TODO.UPDATE, by);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Update failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                if (serverResponseData.errorCode === ErrorCode.DataIsTheSame) {

                    set({
                        errorMessage: serverResponseData.errorCode
                    })

                    return false;
                }

                set({
                    errorMessage: ErrorCode.RequestFailed
                })

                return false;
            }

            await get().fetchAll();

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Todo Update exception: ", error.message);
            }

            return false;

        } finally {
            set({
                isLoadingTodo: false
            });
        }
    },

    remove: async (todoId: string): Promise<boolean> => {

        console.log("Todo Remove");

        set({
            isLoadingTodo: true
        });

        try {

            const serverResponse = await $api.delete<Result<void>>(ENDPOINTS.TODO.DELETE, {
                data: {todoId}
            });

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Remove failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                if (serverResponseData.errorCode === ErrorCode.TodoNotFound) {

                    set({
                        errorMessage: serverResponseData.errorCode
                    })

                    return false;
                }

                set({
                    errorMessage: ErrorCode.RequestFailed
                })

                return false;
            }

            await get().fetchAll();

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Todo Remove exception: ", error.message);
            }

            return false;

        } finally {
            set({
                isLoadingTodo: false
            });
        }
    },

    toggle: async (todoId: string): Promise<boolean> => {

        console.log("Todo Toggle");

        set({
            isLoadingTodo: true
        });

        try {

            const serverResponse = await $api.put<Result<void>>(ENDPOINTS.TODO.TOGGLE, {
                todoId
            });

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Toggle failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                return false;
            }

            await get().fetchAll();

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Todo Toggle exception: ", error.message);
            }
            return false;
        } finally {
            set({
                isLoadingTodo: false
            });
        }
    },

    clearStore: (): void => {
        set({
            ...initState
        });
    }
}));