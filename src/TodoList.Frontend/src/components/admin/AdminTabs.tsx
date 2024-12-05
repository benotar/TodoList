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
import DataCardWrapper from "@/components/reusable/DataCardWrapper.tsx";

const AdminTabs: FC = () => {
    return (
        <Tabs
            defaultValue="users"
            className="flex flex-col space-y-5 items-center justify-center w-full px-4"
        >
            {/* Вкладки */}
            <TabsList className="space-x-2">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="all-todos">All Todos</TabsTrigger>
            </TabsList>

            {/* Контент вкладки "Users" */}
            <TabsContent value="users" className="w-full">
                <DataCardWrapper
                    header={"Hi there!"}
                    description={"Here's a list of users!"}
                    footerChildren={<></>}
                >
                    <div className="overflow-x-auto w-full min-w-[300px] md:min-w-[600px]">
                        <UsersTable columns={usersTableColumns} />
                    </div>
                </DataCardWrapper>
            </TabsContent>

            {/* Контент вкладки "All Todos" */}
            <TabsContent value="all-todos" className="w-full">
                <DataCardWrapper
                    header={"Hi there!"}
                    description={"Here's a list of all users tasks!"}
                    footerChildren={<></>}
                >
                    <div className="overflow-x-auto w-full min-w-[300px] md:min-w-[600px]">
                        <TodoAdminTable columns={todoAdminTableColumns} />
                    </div>
                </DataCardWrapper>
            </TabsContent>
        </Tabs>
    );
};

export default AdminTabs;