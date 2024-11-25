import {useShallow} from "zustand/shallow";
import {useTodoStore} from "@/store/todoStore.ts";

export const useTodoAction = () => {
    const {
        fetchAll,
        toggle
    } = useTodoStore(useShallow((state) => ({
        fetchAll: state.fetchAll,
        toggle: state.toggle
    })));

    return {
        fetchAll,
        toggle
    };
};