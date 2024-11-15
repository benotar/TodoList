import {FC} from "react";
import TodosTable from "@/components/todo/TodosTable.tsx";

import DataCardWrapper from "@/components/shared/DataCardWrapper.tsx";
import {TableCaption} from "@/components/ui/table.tsx";

const TodoPage: FC = () => {
    return (
        <DataCardWrapper
            header={
                <TableCaption className="text-xl font-semibold">
                    A list of your todos
                </TableCaption>
            }
        >
            <TodosTable/>
        </DataCardWrapper>
    );
}

export default TodoPage;