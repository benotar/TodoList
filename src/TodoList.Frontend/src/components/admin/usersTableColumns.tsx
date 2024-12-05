import {
    ColumnDef,
} from "@tanstack/react-table";


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {UsersTableRowActions} from "@/components/admin/UsersTableRowActions.tsx";
import {DataTableColumnHeader} from "@/components/reusable/DataTableColumnHeader.tsx";
import {usersTableSchema, UserTable} from "@/schema";
import {Label} from "@/components/ui/label.tsx";
import { Crown } from "lucide-react";
import { PersonStanding } from "lucide-react";
import {Permission} from "@/types/store/Auth.ts";

export const usersTableColumns: ColumnDef<UserTable>[] = [
    {
        accessorKey: "userId",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Id" className="ml-2"/>
        ),
        cell: ({row}) => {
            const user = usersTableSchema.parse(row.original);
            const guid = user.userId;
            const shortGuid = `${guid.slice(0, 8)} ... ${guid.slice(-4)}`;

            return (
                <div className="font-semibold px-2 py-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>{shortGuid}</TooltipTrigger>
                            <TooltipContent>
                                <p className="font-semibold">{guid}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "userName",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="UserName"/>
        ),
        cell: ({row}) => {

            const user = usersTableSchema.parse(row.original);

            return <Label>{user.userName}</Label>
        }
    },
    {
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Name"/>
        ),
        cell: ({row}) => {

            const user = usersTableSchema.parse(row.original);

            return <Label>{user.name}</Label>
        }
    },
    {
        accessorKey: "permission",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Permission"/>
        ),
        cell: ({row}) => {

            const user = usersTableSchema.parse(row.original);

            return user.permission === Permission.Advanced
                ? <Label className="flex justify-start items-center">
                    <Crown size={"18px"} color={"gold"} className="mr-1"/>
                    {user.permission}
                </Label>
                : <Label className="flex justify-start items-center">
                    <PersonStanding size={"18px"} color={"gray"} className="mr-1"/>
                    {user.permission}
                </Label>
        }
    },
    {
        id: "actions",
        cell: ({row}) => <UsersTableRowActions row={row}/>,
    },
];