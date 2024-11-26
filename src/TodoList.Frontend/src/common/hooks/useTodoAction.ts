import {useShallow} from "zustand/shallow";
import {useTodoStore} from "@/store/todoStore.ts";

export const useTodoAction = () => {
    const {
        fetchAll,
        fetchById,
        toggle
    } = useTodoStore(useShallow((state) => ({
        fetchAll: state.fetchAll,
        fetchById: state.fetchById,
        toggle: state.toggle
    })));

    return {
        fetchAll,
        fetchById,
        toggle
    };
};