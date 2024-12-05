import {Row} from "@tanstack/react-table";
import {usersTableSchema} from "@/schema";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";

type UsersTableRowActionsProps<TData> = {
    row: Row<TData>
}

export function UsersTableRowActions<TData>({
                                                row
                                            }: UsersTableRowActionsProps<TData>) {

    const user = usersTableSchema.parse(row.original);

    return (
        <div className="flex space-x-2">
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
