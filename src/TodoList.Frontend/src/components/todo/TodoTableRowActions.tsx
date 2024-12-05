import {Row} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {todoTableSchema} from "@/schema/index.ts";

import {toast} from "sonner";
import {UpdateTodoDialog} from "@/components/todo/UpdateTodoDialog.tsx";
import {RemoveTodoDialog} from "@/components/todo/RemoveTodoDialog.tsx";

type TodoTableRowActionsProps<TData> = {
    row: Row<TData>
}

export function TodoTableRowActions<TData>({row}: TodoTableRowActionsProps<TData>) {

    const todo = todoTableSchema.parse(row.original);

    return (
        <div className="flex space-x-2">
            <UpdateTodoDialog
                titleModal={"Are you absolutely sure?"}
                descriptionModal={"This action cannot be undone."}
                onActionLabel={"Save changes"}
                row={row}
            />
            <RemoveTodoDialog
                titleModal={"Are you absolutely sure?"}
                descriptionModal={"This action cannot be undone."}
                onActionLabel={"Yes, remove"}
                row={row}
            />
            <Button variant="ghost"
                    className="h-8"
                    onClick={() => {
                        void navigator.clipboard.writeText(todo.todoId);
                        toast.success("Copied!")
                    }}
            >
                Copy ID
            </Button>
        </div>
    );
}
