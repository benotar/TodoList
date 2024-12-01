import {
    ColumnDef,
    flexRender,
} from "@tanstack/react-table";

import {Table as TanstackTable} from "@tanstack/react-table";

import {DataTablePagination} from "@/components/reusable/DataTablePagination.tsx";
import {ReactElement} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table.tsx";


type DataTableWrapperProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    toolbar: ReactElement;
    table: TanstackTable<TData>;
}

export function DataTableWrapper<TData, TValue>({
                                                    columns,
                                                    table,
                                                    toolbar
                                                }: DataTableWrapperProps<TData, TValue>) {

    return (
        <div className="flex flex-col w-full space-y-4">

            {/*Toolbar*/}
            {toolbar}

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell, cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <DataTablePagination table={table}/>
        </div>
    );
}