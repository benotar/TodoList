import {Row} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {todoAdminTableSchema} from "@/schema/index.ts";

import {toast} from "sonner";

type TodoTableRowActionsProps<TData> = {
    row: Row<TData>
}

export function TodoAdminTableRowActions<TData>({row}: TodoTableRowActionsProps<TData>) {

    const todo = todoAdminTableSchema.parse(row.original);

    return (
        <div className="flex space-x-2">
            <Button variant="ghost"
                    onClick={() => {
                        void navigator.clipboard.writeText(todo.todoId);
                        toast.success("Copied!")
                    }}
            >
                Copy Todo ID
            </Button>
            <div className="flex space-x-2">
                <Button variant="ghost"
                        onClick={() => {
                            void navigator.clipboard.writeText(todo.userId);
                            toast.success("Copied!")
                        }}
                >
                    Copy User ID
                </Button>
            </div>
        </div>
    );
}
