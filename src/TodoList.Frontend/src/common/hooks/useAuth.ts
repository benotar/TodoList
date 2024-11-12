import {useAuthSlice} from "@/store/authSlice.ts";
import {useShallow} from "zustand/shallow";

export const useAuth = () => {
    const {
        isAuth,
        permission,
        token,
        errorMessage,
        isLoading,
        register,
        login,
        logout,

    } = useAuthSlice(useShallow((state) => ({
        isAuth: state.isAuth,
        permission: state.permission,
        token: state.token,
        errorMessage: state.errorMessage,
        isLoading: state.isLoading,
        register: state.register,
        login: state.login,
        logout: state.logout,
    })));

    return {
        isAuth,
        permission,
        token,
        errorMessage,
        isLoading,
        register,
        login,
        logout,

    };
}