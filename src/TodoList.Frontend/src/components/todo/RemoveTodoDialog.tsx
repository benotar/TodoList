import {Row} from "@tanstack/react-table";
import {todoTableSchema} from "@/schema";
import {useState} from "react";
import {useTodoAction} from "@/common/hooks/useTodoAction.ts";
import ActionRecordDialog from "@/components/reusable/ActionRecordDialog.tsx";
import {useTodoStore} from "@/store/todoStore.ts";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";

type DeleteTodoDialogProps<TData> = {
    titleModal: string;
    descriptionModal: string;
    onActionLabel: string;
    row: Row<TData>
};

export function RemoveTodoDialog<TData>({
                                            titleModal,
                                            descriptionModal,
                                            onActionLabel,
                                            row
                                        }: DeleteTodoDialogProps<TData>) {

    const todo = todoTableSchema.parse(row.original);
    const {remove} = useTodoAction();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleDelete = async () => {

        const isRemoved = await remove(todo.todoId);

        if (!isRemoved) {

            const currentErrorMessage = useTodoStore.getState().errorMessage;

            toast.error(currentErrorMessage ?? ErrorCode.UnknownError);
            return;
        }

        toast.success("Success!");
        setIsDialogOpen(false);
    }

    return (
        <ActionRecordDialog
            actionButton={"Remove"}
            actionButtonModal={"Confirm removal"}
            titleDialog={"Remove Todo"}
            descriptionDialog={"Click \"Confirm removal\" when you're done."}
            titleModal={titleModal}
            descriptionModal={descriptionModal}
            onActionLabel={onActionLabel}
            handleAction={handleDelete}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
        >
            <></>
        </ActionRecordDialog>
    );
}
