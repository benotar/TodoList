import {useShallow} from "zustand/shallow";
import {useAdminStore} from "@/store/adminStore.ts";

export const useAdminAction = () => {
    const {
        fetchTodos,
        fetchUsers,
        createAdmin
    } = useAdminStore(useShallow((state) => ({
        fetchTodos: state.fetchTodos,
        fetchUsers: state.fetchUsers,
        createAdmin: state.createAdmin
    })));

    return {
        fetchTodos,
        fetchUsers,
        createAdmin
    };
};