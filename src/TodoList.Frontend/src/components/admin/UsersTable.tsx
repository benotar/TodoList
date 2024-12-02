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
import {UsersTableToolbar} from "@/components/admin/UsersTableToolbar.tsx";
import {DataTableWrapper} from "@/components/reusable/DataTableWrapper.tsx";
import {usersTableSchema, UserTable} from "@/schema";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/Errors.ts";
import {z} from "zod";
import {useAdminAction} from "@/common/hooks/useAdminAction.ts";
import {useAdminState} from "@/common/hooks/useAdminState.ts";


type UsersTableProps = {
    columns: ColumnDef<UserTable>[];
}

export function UsersTable({
                                              columns,
                                          }: UsersTableProps) {

    const {fetchUsers} = useAdminAction();
    const {errorMessage, users} = useAdminState();
    const [data, setData] = useState<UserTable[]>([]);


    useEffect(() => {

        const fetchData = async () => {

            const isFetched = await fetchUsers();

            if (!isFetched) {
                toast.error(errorMessage || ErrorCode.UnknownError);
            }
        }
        void fetchData();
    }, [fetchUsers, errorMessage]);

    useEffect(() => {
        try {
            const validatedData = z.array(usersTableSchema).parse(users);

            setData(validatedData);

        } catch (error) {
            if (error instanceof Error) {
                console.log("Todos z parse exception: ", error.message);
            }
        }
    }, [users]);

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