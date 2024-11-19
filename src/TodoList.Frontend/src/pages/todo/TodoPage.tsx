import {FC, useEffect} from "react";
import DataCardWrapper from "@/components/shared/DataCardWrapper.tsx";
import {useTodoStore} from "@/store/todoStore.ts";
import {useShallow} from "zustand/shallow";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";
import {DataTable} from "@/components/shared/TodoTable.tsx";
import {TodosTableColumns} from "@/components/todo/TodosTableColumns.tsx";


const TodoPage: FC = () => {

    const {fetchAll, todos, errorMessage} = useTodoStore(
        useShallow((state) => ({
            fetchAll: state.fetchAll,
            todos: state.todos,
            errorMessage: state.errorMessage,
        })));

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