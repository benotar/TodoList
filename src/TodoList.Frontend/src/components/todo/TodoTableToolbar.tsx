import {Table} from "@tanstack/react-table";
import {DataTableToolbar} from "@/components/reusable/DataTableToolbar.tsx";

type TodoTableToolbarProps<TData> = {
    table: Table<TData>;
}

export function TodoTableToolbar<TData>({
                                            table
                                        }: TodoTableToolbarProps<TData>) {
    const filterFieldNames = {
        forPlaceholder: "title...",
        forFilter: "title"
    }
    return (
        <DataTableToolbar
            table={table}
            placeholder={`Filter by ${filterFieldNames.forPlaceholder}`}
            filterField={filterFieldNames.forFilter}
        />
    );
}