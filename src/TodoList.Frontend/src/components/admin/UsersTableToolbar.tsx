import {Table} from "@tanstack/react-table";
import {DataTableToolbar} from "@/components/reusable/DataTableToolbar.tsx";
import {CreateAdminDialog} from "@/components/admin/CreateAdminDialog.tsx";

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
            placeholder={`Filter by ${filterFieldNames.forPlaceholder}`}
            filterField={filterFieldNames.forFilter}
        >
            <CreateAdminDialog
                titleModal={"Are you absolutely sure?"}
                descriptionModal={"This action cannot be undone."}
                onActionLabel={"Create"}
            />
        </DataTableToolbar>
    );
}