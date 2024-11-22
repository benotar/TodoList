import {useShallow} from "zustand/shallow";
import {useTodoStore} from "@/store/todoStore.ts";

export const useTodoAction = () => {
    const {
        fetchAll
    } = useTodoStore(useShallow((state) => ({
        fetchAll: state.fetchAll
    })));

    return {
        fetchAll
    };
};