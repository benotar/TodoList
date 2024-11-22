import {FC, useEffect} from "react";
import DataCardWrapper from "@/components/shared/DataCardWrapper.tsx";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";
import {DataTable} from "@/components/shared/TodoTable.tsx";
import {TodosTableColumns} from "@/components/todo/TodosTableColumns.tsx";
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
            header={
                "A list of your todos"
            }
        >
            <DataTable data={todos} columns={TodosTableColumns}/>
        </DataCardWrapper>
    );
}

export default TodoPage;