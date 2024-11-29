import {useShallow} from "zustand/shallow";
import {useTodoStore} from "@/store/todoStore.ts";

export const useTodoAction = () => {
    const {
        fetchAll,
        create,
        fetchById,
        toggle,
        update,
        remove
    } = useTodoStore(useShallow((state) => ({
        fetchAll: state.fetchAll,
        create: state.create,
        fetchById: state.fetchById,
        toggle: state.toggle,
        update: state.update,
        remove: state.remove
    })));

    return {
        fetchAll,
        create,
        fetchById,
        toggle,
        update,
        remove
    };
};