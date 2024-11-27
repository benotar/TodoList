import {FC, useEffect, useState} from "react";
import DataCardWrapper from "@/components/shared/DataCardWrapper.tsx";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";
import {TodoTable} from "@/components/todo/TodoTable.tsx";
import {TodoTableColumns} from "@/components/todo/todoTableColumns.tsx";
import {useTodoAction} from "@/common/hooks/useTodoAction.ts";
import {Task, todoTableSchema} from "@/schema";
import {z} from "zod"
import {useTodoState} from "@/common/hooks/useTodoState.ts";

const TodoPage: FC = () => {

    const {fetchAll} = useTodoAction();
    const {errorMessage, todos} = useTodoState();
    const [data, setData] = useState<Task[]>([]);


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
        >
            <TodoTable
                data={data}
                columns={TodoTableColumns}
                key={data.map(todo => todo.todoId).join("-")}
            />
        </DataCardWrapper>
    );
}

export default TodoPage;