import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {useEffect, useState} from "react";
import {DataTableWrapper} from "@/components/reusable/DataTableWrapper.tsx";
import {todoAdminTableSchema, TodoAdminTask} from "@/schema";
import {useAdminAction} from "@/common/hooks/useAdminAction.ts";
import {useAdminState} from "@/common/hooks/useAdminState.ts";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/Errors.ts";
import {z} from "zod";
import {TodoTableToolbar} from "@/components/todo/TodoTableToolbar.tsx";

type TodoAdminTableProps = {
    columns: ColumnDef<TodoAdminTask>[]
}

export function TodoAdminTable({
                                   columns,
                               }: TodoAdminTableProps) {

    const {fetchTodos} = useAdminAction();
    const {errorMessage, todos  } = useAdminState();
    const [data, setData] = useState<TodoAdminTask[]>([]);

    useEffect(() => {

        const fetchData = async () => {

            const isFetched = await fetchTodos();

            if (!isFetched) {
                toast.error(errorMessage || ErrorCode.UnknownError);
            }
        }
        void fetchData();
    }, [fetchTodos, errorMessage]);

    useEffect(() => {
        try {
            const validatedData = z.array(todoAdminTableSchema).parse(todos);

            setData(validatedData);

        } catch (error) {
            if (error instanceof Error) {
                console.log("Todos z parse exception: ", error.message);
            }
        }
    }, [todos]);

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            columnFilters,
        },
        enableRowSelection: true,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <DataTableWrapper
            columns={columns}
            table={table}
            toolbar={<TodoTableToolbar table={table}/>}/>
    );
}
