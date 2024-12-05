import {useShallow} from "zustand/shallow";
import {useAdminStore} from "@/store/adminStore.ts";

export const useAdminAction = () => {
    const {
        fetchTodos,
        fetchUsers,
        createAdmin,
        deleteUser,
        deleteBasicUsers,
        updateUserPermission
    } = useAdminStore(useShallow((state) => ({
        fetchTodos: state.fetchTodos,
        fetchUsers: state.fetchUsers,
        createAdmin: state.createAdmin,
        deleteUser: state.deleteUser,
        deleteBasicUsers: state.deleteBasicUsers,
        updateUserPermission: state.updateUserPermission
    })));

    return {
        fetchTodos,
        fetchUsers,
        createAdmin,
        deleteUser,
        deleteBasicUsers,
        updateUserPermission
    };
};