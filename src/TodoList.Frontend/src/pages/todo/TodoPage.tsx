import {FC, useEffect, useState} from "react";
import DataCardWrapper from "@/components/reusable/DataCardWrapper.tsx";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/Errors.ts";
import {TodoTable} from "@/components/todo/TodoTable.tsx";
import {todoTableColumns} from "@/components/todo/todoTableColumns.tsx";
import {useTodoAction} from "@/common/hooks/useTodoAction.ts";
import {TodoTask, todoTableSchema} from "@/schema";
import {z} from "zod"
import {useTodoState} from "@/common/hooks/useTodoState.ts";
import CreateTodoDialog from "@/components/todo/CreateTodoDialog.tsx";

const TodoPage: FC = () => {

    const {fetchAll} = useTodoAction();
    const {errorMessage, todos} = useTodoState();
    const [data, setData] = useState<TodoTask[]>([]);

    useEffect(() => {

        const fetchData = async () => {

            const isFetched = await fetchAll();

            if (!isFetched) {
                toast.error(errorMessage || ErrorCode.UnknownError);
            }
        }
        void fetchData();
    }, [fetchAll, errorMessage]);

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
        <DataCardWrapper
            header={"Hi there!"}
            description={"Here's a list of your tasks!"}
            footerChildren={ <CreateTodoDialog/>}
        >
            <TodoTable
                data={data}
                columns={todoTableColumns}
                key={data.map(todo => todo.todoId).join("-")}
            />
        </DataCardWrapper>
    );
}

export default TodoPage;