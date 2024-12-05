import {FetchTodoAdminResponse} from "@/types/models/response/TodoResponse.ts";
import {Register, UpdatePermission, UpdateUser} from "@/types/models/request/UserRequest.ts";
import {FetchUserResponse} from "@/types/models/response/UsersResponse.ts";
import {ErrorCode} from "@/types/models/response/Errors.ts";

export type AdminState = {
    todos: FetchTodoAdminResponse[];
    users: FetchUserResponse[];
    errorMessage: ErrorCode | null;
    isLoading: boolean;
};

export type AdminActions = {
    createAdmin: (by: Register) => Promise<boolean>;
    fetchUsers: () => Promise<boolean>;
    updateUser: (by: UpdateUser) => Promise<boolean>;
    updateUserPermission: (by: UpdatePermission) => Promise<boolean>;
    deleteUser: (userId: string) => Promise<boolean>;
    deleteBasicUsers: () => Promise<boolean>;
    fetchTodos: () => Promise<boolean>;
    deleteAllTodos: () => Promise<boolean>;
};

export type AdminSlice = AdminState & AdminActions;