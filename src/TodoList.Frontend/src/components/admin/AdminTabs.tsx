import {FC, useEffect, useState} from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {UsersTable} from "@/components/admin/UsersTable.tsx";
import {usersTableColumns} from "@/components/admin/usersTableColumns.tsx";
import {todoTableColumns} from "@/components/todo/todoTableColumns.tsx";
import {TodoTable} from "@/components/todo/TodoTable.tsx";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/Errors.ts";
import {z} from "zod";
import {todoTableSchema, TodoTask} from "@/schema";
import {useAdminAction} from "@/common/hooks/useAdminAction.ts";
import {useAdminState} from "@/common/hooks/useAdminState.ts";

const AdminTabs: FC = () => {

    const {fetchTodos} = useAdminAction();
    const {errorMessage, todos} = useAdminState();
    const [data, setData] = useState<TodoTask[]>([]);

    useEffect(() => {

        const fetchData = async () => {

            const isFetched = await fetchTodos();

            if (!isFetched) {
                toast.error(errorMessage || ErrorCode.UnknownError);
            }
        }
        void fetchData();
    }, [fetchTodos, errorMessage]);

    useEffect(() => {
        try {
            const validatedData = z.array(todoTableSchema).parse(todos);
            setData(validatedData);
        } catch (error) {
            if (error instanceof Error) {
                console.log("Todos z parse exception: ", error.message);
            }
        }
    }, [todos]);

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
                />
            </TabsContent>
            <TabsContent value="all-todos">
                <TodoTable
                    columns={todoTableColumns}
                    data={data}
                />
            </TabsContent>
        </Tabs>
    );
};

export default AdminTabs;