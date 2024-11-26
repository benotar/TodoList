import {HTMLAttributes, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";
import {useTodoAction} from "@/common/hooks/useTodoAction.ts";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";
import {useTodoStore} from "@/store/todoStore.ts";
import {Row} from "@tanstack/react-table";
import {todoTableSchema} from "@/schema";

type TodoCompletedProps<TData> = HTMLAttributes<HTMLDivElement> & {
    row: Row<TData>;
}


export function TodoCompleted<TData>({
                                         row,
                                         className
                                     }: TodoCompletedProps<TData>) {

    const todo = todoTableSchema.parse(row.original);

    const [checked, setChecked] = useState(todo.isCompleted);

    const {toggle} = useTodoAction();

    const handleChecked = async (value: CheckedState) => {

        console.log("Toggle handling");

        const isToggled = await toggle(todo.todoId);

        if (isToggled) {

            setChecked(value as boolean);

            toast.success("Success!");

            return;
        }

        const currentErrorMessage = useTodoStore.getState().errorMessage;
        toast.error(currentErrorMessage ?? ErrorCode.UnknownError);
    }

    return (
        <Checkbox
            checked={checked}
            onCheckedChange={(value) => handleChecked(value)}
            className={className}
        />
    );
}
