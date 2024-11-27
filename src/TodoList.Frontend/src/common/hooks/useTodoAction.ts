import {useShallow} from "zustand/shallow";
import {useTodoStore} from "@/store/todoStore.ts";

export const useTodoAction = () => {
    const {
        fetchAll,
        fetchById,
        toggle,
        update
    } = useTodoStore(useShallow((state) => ({
        fetchAll: state.fetchAll,
        fetchById: state.fetchById,
        toggle: state.toggle,
        update: state.update
    })));

    return {
        fetchAll,
        fetchById,
        toggle,
        update
    };
};