import {ColumnDef} from "@tanstack/react-table";
import {FetchTodoResponse} from "@/types/models/response/TodoResponse.ts";


export const TodosTableColumns: ColumnDef<FetchTodoResponse>[] = [
    {
        accessorKey: "todoId",
        header: "Id"
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "isCompleted",
        header: "Status"
    }
];