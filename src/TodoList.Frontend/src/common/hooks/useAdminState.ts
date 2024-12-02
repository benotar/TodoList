import {useShallow} from "zustand/shallow";
import {useAdminStore} from "@/store/adminStore.ts";

export const useAdminState = () => {
    const {
        users,
        todos,
        errorMessage
    } = useAdminStore(useShallow((state) => ({
        users: state.users,
        todos: state.todos,
        errorMessage: state.errorMessage
    })));

    return {
        todos,
        users,
        errorMessage
    };
};