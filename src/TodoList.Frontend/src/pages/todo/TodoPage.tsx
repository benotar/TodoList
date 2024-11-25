import {FC, useEffect} from "react";
import DataCardWrapper from "@/components/shared/DataCardWrapper.tsx";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";
import {TodoTable} from "@/components/todo/TodoTable.tsx";
import {TodoTableColumns} from "@/components/todo/todoTableColumns.tsx";
import {useTodoState} from "@/common/hooks/useTodoState.tsx";
import {useTodoAction} from "@/common/hooks/useTodoAction.ts";


const TodoPage: FC = () => {

    const {fetchAll} = useTodoAction();
    const {todos, errorMessage} = useTodoState();


    useEffect(() => {

        void fetchAll();

        const currentErrorMessage = errorMessage;

        if (currentErrorMessage) {
            toast.error(currentErrorMessage || ErrorCode.UnknownError);
        }

    }, [fetchAll, errorMessage]);


    return (
        <DataCardWrapper
            header={"Hi there!"}
            description={"Here's a list of your tasks!"}
        >
            <TodoTable
                data={todos}
                columns={TodoTableColumns}
            />
        </DataCardWrapper>
    );
}

export default TodoPage;