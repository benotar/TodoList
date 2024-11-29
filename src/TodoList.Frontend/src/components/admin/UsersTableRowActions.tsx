import {Row} from "@tanstack/react-table";
import {usersTableSchema} from "@/schema";

type UsersTableRowActionsProps<TData> = {
    row: Row<TData>
}

export function UsersTableRowActions<TData>({
                                                row
                                            }: UsersTableRowActionsProps<TData>) {

    const user = usersTableSchema.parse(row.original);

    return (
        <div className="flex space-x-2">
            <p>Users Table Row Actions</p>
            <p>{user.userName}</p>
        </div>
    );
}
