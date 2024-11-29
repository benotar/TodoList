import {useShallow} from "zustand/shallow";
import {useTodoStore} from "@/store/todoStore.ts";

export const useTodoState = () => {
    const {
        todos,
        errorMessage,
        isLoadingTodo,
    } = useTodoStore(useShallow((state) => ({
        todos: state.todos,
        errorMessage: state.errorMessage,
        isLoadingTodo: state.isLoadingTodo
    })));

    return {
        todos,
        errorMessage,
        isLoadingTodo
    };
};