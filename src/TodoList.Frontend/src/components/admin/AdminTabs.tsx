import {FC} from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {UsersTable} from "@/components/admin/UsersTable.tsx";
import {usersTableColumns} from "@/components/admin/usersTableColumns.tsx";

const AdminTabs: FC = () => {
    return (
        <Tabs
            defaultValue="users"
            className="flex flex-col items-center justify-center"
        >
            <TabsList className="space-x-2">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="all-todos">All Todos</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
                <UsersTable
                    columns={usersTableColumns}
                    data={[{
                        userId: "userId1",
                        userName: "userName1",
                        name: "name1",
                        permission: "permission1"
                    },
                        {
                            userId: "userId2",
                            userName: "userName2",
                            name: "name2",
                            permission: "permission2"
                        }]}
                />
            </TabsContent>
            <TabsContent value="all-todos">
                Table todos
            </TabsContent>
        </Tabs>
    );
};

export default AdminTabs;