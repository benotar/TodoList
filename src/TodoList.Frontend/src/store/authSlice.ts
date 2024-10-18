import {AuthSlice, State} from "@/types/store/Auth.ts";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware/persist";
import {Login, Register} from "@/types/models/request/UserRequest.ts";

const initialState: State = {
    isAuth: false,
    token: null,
    errorCode: null
};

export const useAuthSlice = create<AuthSlice>()(persist((set) => ({
    ...initialState,
    register: async (by: Register): Promise<void> => {

    },
    login: async (by: Login): Promise<void> => {

    },
    logout: async (): Promise<void> => {

    },
    refresh: async (): Promise<void> => {

    }
}), {
    name: 'todo-list-storage',
    storage: createJSONStorage(() => sessionStorage)
}));