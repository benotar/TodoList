import {FC} from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {UsersTable} from "@/components/admin/UsersTable.tsx";
import {usersTableColumns} from "@/components/admin/usersTableColumns.tsx";
import {todoAdminTableColumns} from "@/components/admin/todoAdminTableColumns.tsx";
import {TodoAdminTable} from "@/components/admin/TodoAdminTable.tsx";

const AdminTabs: FC = () => {

    return (
        <Tabs
            defaultValue="users"
            className="flex flex-col space-y-5 items-center justify-center"
        >
            <TabsList className="space-x-2">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="all-todos">All Todos</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
                <UsersTable
                    columns={usersTableColumns}
                />
            </TabsContent>
            <TabsContent value="all-todos">
                <TodoAdminTable
                    columns={todoAdminTableColumns}
                />
            </TabsContent>
        </Tabs>
    );
};

export default AdminTabs;