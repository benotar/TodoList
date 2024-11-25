import {Row} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {todoTableSchema} from "@/schema/index.ts";

type TodoTableRowActionsProps<TData> = {
    row: Row<TData>
}

export function TodoTableRowActions<TData>({row}: TodoTableRowActionsProps<TData>) {

    const todos = todoTableSchema.parse(row.original);

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(todos.todoId)}
                >
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Update</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
