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

import {useState} from "react";
import {DataTableWrapper} from "@/components/reusable/DataTableWrapper.tsx";
import {TodoTableToolbar} from "@/components/todo/TodoTableToolbar.tsx";

type TodoTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function TodoTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: TodoTableProps<TData, TValue>) {
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
    });
    return (
        <DataTableWrapper
            columns={columns}
            table={table}
            toolbar={<TodoTableToolbar table={table}/>}
        />
    );
}
