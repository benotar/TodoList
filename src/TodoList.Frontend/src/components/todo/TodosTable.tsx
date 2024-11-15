import {FC, useEffect} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import {useTodoStore} from "@/store/todoStore.ts";
// import {useShallow} from "zustand/shallow";
// import {useAuthStore} from "@/store/authStore.ts";
// import {toast} from "sonner";


const TodosTable: FC = () => {

    const todoStore = useTodoStore();

    // const fetchTodos = async () => {
    //     try {
    //
    //         await fetchAll();
    //
    //         const currentErrorMessage = useAuthStore.getState().errorMessage;
    //
    //         if (currentErrorMessage) {
    //             toast.error(currentErrorMessage || "Unexpected error.");
    //             return;
    //         }
    //
    //         toast.success("You are successfully logged in.");
    //
    //     } catch (error: unknown) {
    //         console.log('Error catch: ', error);
    //
    //         toast.error('An error occurred on the server.');
    //     }
    // }

    useEffect(() => {

        todoStore.fetchAll();

    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">Id</TableHead>
                    <TableHead className="text-left">Title</TableHead>
                    <TableHead className="text-right">Completed</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {todoStore.todos?.map(({todoId, title, isCompleted}) => (
                    <TableRow key={todoId}>
                        <TableCell className="font-medium">{todoId}</TableCell>
                        <TableCell>{title}</TableCell>
                        <TableCell>
                            <div className="flex justify-end mr-8">
                                <Checkbox checked={isCompleted}/>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                {/*<TableRow>*/}
                {/*    */}

                {/*    <TableCell className="font-medium">GUID ID</TableCell>*/}
                {/*    <TableCell>TITLE</TableCell>*/}
                {/*    <TableCell>*/}
                {/*        <div className="flex justify-end mr-8">*/}
                {/*            <Checkbox/>*/}
                {/*        </div>*/}
                {/*    </TableCell>*/}
                {/*</TableRow>*/}
            </TableBody>
        </Table>
    );
}

export default TodosTable;