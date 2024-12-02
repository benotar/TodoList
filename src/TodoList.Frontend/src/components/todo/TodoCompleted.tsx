import {HTMLAttributes} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";
import {useTodoAction} from "@/common/hooks/useTodoAction.ts";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/Errors.ts";
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

    // const [checked, setChecked] = useState(todo.isCompleted);

    const {toggle} = useTodoAction();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleChecked = async (_: CheckedState) => {

        console.log("Toggle handling");

        const isToggled = await toggle(todo.todoId);

        if (isToggled) {
            toast.success("Success!");
            return;
        }

        const currentErrorMessage = useTodoStore.getState().errorMessage;
        toast.error(currentErrorMessage ?? ErrorCode.UnknownError);
    }

    return (
        <Checkbox
            checked={todo.isCompleted}
            onCheckedChange={(value) => handleChecked(value)}
            className={className}
        />
    );
}
