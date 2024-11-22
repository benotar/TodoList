import {useShallow} from "zustand/shallow";
import {useTodoStore} from "@/store/todoStore.ts";

export const useTodoState = () => {
    const {
        todos,
        errorMessage
    } = useTodoStore(useShallow((state) => ({
        todos: state.todos,
        errorMessage: state.errorMessage,
    })));

    return {
        todos,
        errorMessage
    };
};