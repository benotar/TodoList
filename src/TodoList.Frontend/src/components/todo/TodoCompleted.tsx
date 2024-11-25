import {FC, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";
import {useTodoAction} from "@/common/hooks/useTodoAction.ts";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";
import {useTodoStore} from "@/store/todoStore.ts";

type TodoCompletedProps = {
    isCompleted: boolean;
    todoId: string;
    className?: string;
}


const TodoCompleted: FC<TodoCompletedProps> = ({
                                                   isCompleted,
                                                   todoId,
                                                   className = ""
                                               }: TodoCompletedProps) => {

    const [todoIsCompleted, setTodoIsCompleted] = useState<CheckedState>(isCompleted);
    const {toggle} = useTodoAction();

    const handleChecked = async (value: CheckedState, todoId: string) => {

        console.log("Toggle handling");

        await toggle(todoId);

        const currentErrorMessage = useTodoStore.getState().errorMessage;

        if (currentErrorMessage) {

            toast.error(currentErrorMessage || ErrorCode.UnknownError);

            return;
        }

    }

    return (
        <Checkbox
            checked={todoIsCompleted}
            onCheckedChange={(value) => handleChecked(value, todoId)}
            className={className}
        />
    );
}

export default TodoCompleted;