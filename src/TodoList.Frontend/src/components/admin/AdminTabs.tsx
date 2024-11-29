import {FC} from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

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
                Table users
            </TabsContent>
            <TabsContent value="all-todos">
                Table todos
            </TabsContent>
        </Tabs>
    );
};

export default AdminTabs;