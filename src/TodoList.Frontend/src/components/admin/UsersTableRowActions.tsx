import {Row} from "@tanstack/react-table";
import {usersTableSchema} from "@/schema";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";
import {RemoveUserDialog} from "@/components/admin/RemoveUserDialog.tsx";

type UsersTableRowActionsProps<TData> = {
    row: Row<TData>
}

export function UsersTableRowActions<TData>({
                                                row
                                            }: UsersTableRowActionsProps<TData>) {

    const user = usersTableSchema.parse(row.original);

    return (
        <div className="flex space-x-2">
            <RemoveUserDialog
                titleModal={"Are you absolutely sure?"}
                descriptionModal={"This action cannot be undone."}
                onActionLabel={"Yes, remove"}
                row={row}
            />
            <Button variant="ghost"
                    className="h-8"
                    onClick={() => {
                        void navigator.clipboard.writeText(user.userId);
                        toast.success("Copied!")
                    }}
            >
                Copy ID
            </Button>
        </div>
    );
}
