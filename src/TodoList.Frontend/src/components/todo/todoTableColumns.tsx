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
import {todoTableSchema} from "@/schema";
import TodoCompleted from "@/components/todo/TodoCompleted.tsx";



export const TodoTableColumns: ColumnDef<FetchTodoResponse>[] = [
    {
        accessorKey: "todoId",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Id"/>
        ),
        cell: ({row}) => {
            const todos = todoTableSchema.parse(row.original);
            const guid = todos.todoId;
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
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Completed"/>
        ),
        cell: ({row}) => {
            const todos = todoTableSchema.parse(row.original);

            return (
                // <div className="ml-5">
                //     <Checkbox
                //         checked={todos.isCompleted}
                //         onCheckedChange={(value) => alert(value)}
                //         className="translate-y-[2px] ml-5"
                //     />
                // </div>

                <TodoCompleted
                    isCompleted={todos.isCompleted}
                    todoId = {todos.todoId}
                    className={"ml-6 translate-y-[2px]"}
                />
            );
        }
    },
    {
        id: "actions",
        cell: ({row}) => <TodoTableRowActions row={row}/>,
    },
];