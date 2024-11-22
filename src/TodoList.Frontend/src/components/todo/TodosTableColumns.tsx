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

import {
    MoreHorizontal
} from "lucide-react";
import {
    Button
} from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export const TodosTableColumns: ColumnDef<FetchTodoResponse>[] = [
    {
        accessorKey: "todoId",
        header: "Id",
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
        }
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
        cell: ({row}) => {
            const todos = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
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
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];