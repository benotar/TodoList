import {
    ColumnDef,
} from "@tanstack/react-table";


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {TodoTableRowActions} from "@/components/todo/TodoTableRowActions.tsx";
import {DataTableColumnHeader} from "@/components/reusable/DataTableColumnHeader.tsx";
import {todoAdminTableSchema, TodoAdminTask} from "@/schema";
import {TodoCompleted} from "@/components/todo/TodoCompleted.tsx";
import {Label} from "@/components/ui/label.tsx";


export const todoAdminTableColumns: ColumnDef<TodoAdminTask>[] = [
    {
        accessorKey: "todoId",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Id" className="ml-2"/>
        ),
        cell: ({row}) => {
            const todo = todoAdminTableSchema.parse(row.original);
            const guid = todo.todoId;
            const shortGuid = `${guid.slice(0, 8)} ... ${guid.slice(-4)}`;

            return (
                <div className="font-semibold px-2 py-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>{shortGuid}</TooltipTrigger>
                            <TooltipContent>
                                <p className="font-semibold">{guid}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "userId",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="User ID"/>
        ),
        cell: ({row}) => {

            const todo = todoAdminTableSchema.parse(row.original);
            const guid = todo.todoId;
            const shortGuid = `${guid.slice(0, 8)} ... ${guid.slice(-4)}`;

            return (
                <div className="font-semibold px-2 py-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>{shortGuid}</TooltipTrigger>
                            <TooltipContent>
                                <Label>{shortGuid}</Label>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        }
    },
    {
        accessorKey: "title",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Title"/>
        ),
        cell: ({row}) => {
            const todo = todoAdminTableSchema.parse(row.original);

            if (todo.isCompleted) {
                return <Label className="line-through">{todo.title}</Label>
            }

            return <Label>{todo.title}</Label>
        }
    },
    {
        accessorKey: "isCompleted",
        header: ({column}) => <DataTableColumnHeader column={column} title="Completed"/>,
        cell: ({row}) => {
            const todo = todoAdminTableSchema.parse(row.original);

            return <TodoCompleted
                todo={todo}
                className="ml-6 translate-y-[2px]"
            />
        },
        enableSorting: true,
        enableHiding: true
    },
    {
        id: "actions",
        cell: ({row}) => <TodoTableRowActions row={row}/>,
    },
];