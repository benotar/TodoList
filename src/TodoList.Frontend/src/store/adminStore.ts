import {AdminSlice} from "@/types/store/Admin.ts";
import {ErrorCode} from "@/types/models/response/Errors.ts";
import {create} from "zustand";
import $api from "@/common/axios.ts";
import {Result} from "@/types/models/response/AuthResponse.ts";
import {FetchTodoAdminResponse, TodoCameFromServer} from "@/types/models/response/TodoResponse.ts";
import {ENDPOINTS} from "@/common/endpoints.ts";
import {FetchUserResponse} from "@/types/models/response/UsersResponse.ts";
import {Register, UpdatePermission, UpdateUser} from "@/types/models/request/UserRequest.ts";

const initState: AdminSlice = {
    users: [],
    todos: [],
    errorMessage: null,
    isLoading: false,
    createAdmin: async (): Promise<boolean> => false,
    deleteAllTodos: async (): Promise<boolean> => false,
    deleteBasicUsers: async (): Promise<boolean> => false,
    deleteUser: async (): Promise<boolean> => false,
    fetchTodos: async (): Promise<boolean> => false,
    fetchUsers: async (): Promise<boolean> => false,
    updateUser: async (): Promise<boolean> => false,
    updateUserPermission: async (): Promise<boolean> => false
};

export const useAdminStore = create<AdminSlice>((set, get) => ({
    ...initState,

    fetchTodos: async (): Promise<boolean> => {

        console.log("Todo Fetch All Admin");

        set({isLoading: true});

        try {
            const serverResponse = await $api.get<Result<TodoCameFromServer[]>>(ENDPOINTS.ADMIN.GET_TODOS);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Fetch All failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                set({
                    errorMessage: ErrorCode.RequestFailed
                });

                return false;
            }

            const todosWithUserIds: FetchTodoAdminResponse[] = serverResponseData.data.map(todo => ({
                todoId: todo.todoId,
                userId: todo.user.userId,
                title: todo.title,
                isCompleted: todo.isCompleted,
            }));

            set({
                todos: todosWithUserIds
            });

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Todo Fetch All Admin exception: ", error.message);
            }

            set({
                ...initState
            });

            return false;

        } finally {
            set({isLoading: false});
        }
    },

    fetchUsers: async (): Promise<boolean> => {

        console.log("Users Fetch All Admin");

        set({isLoading: true});

        try {
            const serverResponse = await $api.get<Result<FetchUserResponse[]>>(ENDPOINTS.ADMIN.GET_USERS);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Users Fetch All failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                set({
                    errorMessage: ErrorCode.RequestFailed
                });

                return false;
            }

            set({
                users: serverResponseData.data
            });

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Users Fetch All Admin exception: ", error.message);
            }

            set({
                ...initState
            });

            return false;

        } finally {
            set({isLoading: false});
        }
    },

    createAdmin: async (by: Register): Promise<boolean> => {

        console.log("Register admin");

        set({isLoading: true});

        try {
            const serverResponse = await $api.post<Result<void>>(ENDPOINTS.ADMIN.CREATE_ADMIN, by);

            const serverResponseData = serverResponse?.data;

            if (!serverResponseData || !serverResponseData.isSucceed) {

                console.log("Register admin failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                set({
                    errorMessage: serverResponseData.errorCode
                });

                return false;
            }

            await get().fetchUsers();

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Register admin exception: ", error.message);
            }

            set({
                ...initState,
                errorMessage: ErrorCode.UnknownError
            });

            return false;

        } finally {
            set({isLoading: false});
        }
    },

    deleteUser: async (userId: string): Promise<boolean> => {

        console.log("User Remove");

        set({
            isLoading: true
        });

        try {

            const serverResponse = await $api.delete<Result<void>>(ENDPOINTS.ADMIN.DELETE_USER, {
                data: {userId}
            });

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("User Remove failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

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

            await get().fetchUsers();

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("User Remove exception: ", error.message);
            }

            return false;

        } finally {
            set({
                isLoading: false
            });
        }
    },

    deleteBasicUsers: async (): Promise<boolean> => {

        console.log("Basic Users Remove");

        set({
            isLoading: true
        });

        try {

            const serverResponse = await $api.delete<Result<void>>(ENDPOINTS.ADMIN.DELETE_USERS);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Basic Users failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

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

            await get().fetchUsers();

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Basic Users exception: ", error.message);
            }

            return false;

        } finally {
            set({
                isLoading: false
            });
        }
    },

    updateUserPermission: async (by: UpdatePermission): Promise<boolean> => {

        console.log("Update User Permission");

        set({
            isLoading: true
        });

        try {

            const serverResponse = await $api.post<Result<void>>(ENDPOINTS.ADMIN.UPDATE_PERMISSION, by);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Update User Permission failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

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

            await get().fetchUsers();

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Update User Permission exception: ", error.message);
            }

            return false;

        } finally {
            set({
                isLoading: false
            });
        }
    },

    updateUser: async (by: UpdateUser): Promise<boolean> => {

        console.log("Update User");

        set({
            isLoading: true
        });

        try {

            const serverResponse = await $api.post<Result<void>>(ENDPOINTS.ADMIN.UPDATE_USER, by);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Update User failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

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

            await get().fetchUsers();

            return true;

        } catch (error) {

            if (error instanceof Error) {
                console.log("Update User exception: ", error.message);
            }

            return false;

        } finally {
            set({
                isLoading: false
            });
        }
    }
}));