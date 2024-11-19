import {FC} from "react";
import TodosTable from "@/components/todo/TodosTable.tsx";
import DataCardWrapper from "@/components/shared/DataCardWrapper.tsx";

const TodoPage: FC = () => {

    return (
        <DataCardWrapper
            header={
                "A list of your todos"
            }
        >
            <TodosTable/>
        </DataCardWrapper>
    );
}

export default TodoPage;