import {useShallow} from "zustand/shallow";
import {useAdminStore} from "@/store/adminStore.ts";

export const useAdminAction = () => {
    const {
        fetchTodos,
        fetchUsers
    } = useAdminStore(useShallow((state) => ({
        fetchTodos: state.fetchTodos,
        fetchUsers: state.fetchUsers
    })));

    return {
        fetchTodos,
        fetchUsers
    };
};