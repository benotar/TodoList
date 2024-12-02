import {AdminSlice} from "@/types/store/Admin.ts";
import {ErrorCode} from "@/types/models/response/Errors.ts";
import {create} from "zustand";
import $api from "@/common/axios.ts";
import {Result} from "@/types/models/response/AuthResponse.ts";
import {FetchTodoResponse} from "@/types/models/response/TodoResponse.ts";
import {ENDPOINTS} from "@/common/endpoints.ts";

const initState: AdminSlice = {
    users: [],
    todos: [],
    errorMessage: null,
    isLoading: false,
    createAdmin: async (): Promise<boolean> => false,
    deleteAllTodos: async (): Promise<boolean> => false,
    deleteAllUsers: async (): Promise<boolean> => false,
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
            const serverResponse = await $api.get<Result<FetchTodoResponse[]>>(ENDPOINTS.ADMIN.GET_TODOS);

            const serverResponseData = serverResponse?.data;

            if (!serverResponse || !serverResponseData.isSucceed || !serverResponseData.data) {

                console.log("Todo Fetch All failed: ", serverResponseData.errorCode ?? ErrorCode.RequestFailed);

                set({
                    errorMessage: ErrorCode.RequestFailed
                });

                return false;
            }

            set({
                todos: serverResponseData.data
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
            const serverResponse = await $api.get<Result<FetchTodoResponse[]>>(ENDPOINTS.ADMIN.GET_USERS);

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
}));