import {useAuthStore} from "@/store/authStore.ts";
import {useShallow} from "zustand/shallow";

export const useAuthAction = () => {
    const {register, login, logout, refresh} = useAuthStore(
        useShallow((state) => ({
            register: state.register,
            login: state.login,
            logout: state.logout,
            refresh: state.refresh
        })));

    return {register, login, logout, refresh};
}