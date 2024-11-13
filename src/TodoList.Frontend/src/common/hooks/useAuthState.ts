import {useAuthSlice} from "@/store/authSlice.ts";
import {useShallow} from "zustand/shallow";

export const useAuthState = () => {
    const {
        isAuth,
        permission,
        token,
        errorMessage,
        isLoading,
    } = useAuthSlice(useShallow((state) => ({
        isAuth: state.isAuth,
        permission: state.permission,
        token: state.token,
        errorMessage: state.errorMessage,
        isLoading: state.isLoading,
    })));

    return {
        isAuth,
        permission,
        token,
        errorMessage,
        isLoading,
    };
}