import {useShallow} from "zustand/shallow";
import {useTodoStore} from "@/store/todoStore.ts";

export const useTodoState = () => {
    const {
        todos,
        errorMessage,
        isToggled
    } = useTodoStore(useShallow((state) => ({
        todos: state.todos,
        errorMessage: state.errorMessage,
        isToggled: state.isToggled
    })));

    return {
        todos,
        errorMessage,
        isToggled
    };
};