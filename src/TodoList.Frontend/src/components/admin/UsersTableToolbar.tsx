import {Table} from "@tanstack/react-table";
import {DataTableToolbar} from "@/components/reusable/DataTableToolbar.tsx";

type TodoTableToolbarProps<TData> = {
    table: Table<TData>;
}

export function UsersTableToolbar<TData>({
                                            table
                                        }: TodoTableToolbarProps<TData>) {
    const filterFieldNames = {
        forPlaceholder: "username...",
        forFilter: "userName"
    }
    return (
        <DataTableToolbar
            table={table}
            placeholder={`Filter users by ${filterFieldNames.forPlaceholder}`}
            filterField={filterFieldNames.forFilter}
        />
    );
}