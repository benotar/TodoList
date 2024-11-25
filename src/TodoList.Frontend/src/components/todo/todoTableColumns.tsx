import {
    ColumnDef,
} from "@tanstack/react-table";

import {
    FetchTodoResponse
} from "@/types/models/response/TodoResponse.ts";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {TodoTableRowActions} from "@/components/todo/TodoTableRowActions.tsx";
import {DataTableColumnHeader} from "@/components/shared/DataTableColumnHeader.tsx";


export const TodoTableColumns: ColumnDef<FetchTodoResponse>[] = [
    {
        accessorKey: "todoId",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Id"/>
        ),
        cell: ({row}) => {
            const guid = row.getValue("todoId") as string;
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
        enableSorting: false,
        enableHiding: true
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "isCompleted",
        header: "Status"
    },
    {
        id: "actions",
        cell: ({row}) => <TodoTableRowActions row={row}/>,
    },
];