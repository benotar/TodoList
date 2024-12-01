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
import {UsersTableToolbar} from "@/components/admin/UsersTableToolbar.tsx";
import {DataTableWrapper} from "@/components/reusable/DataTableWrapper.tsx";


type UsersTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function UsersTable<TData, TValue>({
                                              columns,
                                              data
                                          }: UsersTableProps<TData, TValue>) {

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
            toolbar={<UsersTableToolbar table={table}/>}/>
    );
}