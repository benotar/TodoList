import {Table} from "@tanstack/react-table";
import {DataTableViewOptions} from "@/components/reusable/DataTableViewOptions.tsx";
import {ReactNode} from "react";

type DataTableToolbarProps<TData> = {
    table: Table<TData>;
    children: ReactNode;
}

export function DataTableToolbar<TData>({
                                            table,
                                            children
                                        }: DataTableToolbarProps<TData>) {

    return (
        <div className="flex flex-col gap-y-4 sm:flex-row">
            <div className="flex flex-1 items-start gap-x-2">
                {children}
            </div>
            <DataTableViewOptions table={table}/>
        </div>
    );
}