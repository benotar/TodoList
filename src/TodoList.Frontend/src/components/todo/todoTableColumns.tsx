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
import {Task, todoTableSchema} from "@/schema";
import {TodoCompleted} from "@/components/todo/TodoCompleted.tsx";
import {Label} from "@/components/ui/label.tsx";


export const TodoTableColumns: ColumnDef<Task>[] = [
    {
        accessorKey: "todoId",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Id" className="ml-2"/>
        ),
        cell: ({row}) => {
            const todo = todoTableSchema.parse(row.original);
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
        accessorKey: "title",
        header: ({column}) => (
          <DataTableColumnHeader column={column} title="Title"/>
        ),
        cell: ({row}) => {
            const todo = todoTableSchema.parse(row.original);

            if(todo.isCompleted) {
                return <Label className="line-through">{todo.title}</Label>
            }

            return <Label>{todo.title}</Label>
        }
    },
    {
        accessorKey: "isCompleted",
        header: ({column}) => <DataTableColumnHeader column={column} title="Completed"/>,
        cell: ({row}) => <TodoCompleted
            row={row}
            className="ml-6 translate-y-[2px]"
        />,
        enableSorting: true,
        enableHiding: true
    },
    {
        id: "actions",
        cell: ({row}) => <TodoTableRowActions row={row}/>,
    },
];