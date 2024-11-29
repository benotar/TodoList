import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {todoTableSchema} from "@/schema";
import {Row} from "@tanstack/react-table";
import {useTodoAction} from "@/common/hooks/useTodoAction.ts";
import {toast} from "sonner";
import {useTodoStore} from "@/store/todoStore.ts";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";
import ActionRecordDialog from "@/components/reusable/ActionRecordDialog.tsx";

type UpdateTodoDialogProps<TData> = {
    titleModal: string;
    descriptionModal: string;
    onActionLabel: string;
    row: Row<TData>
};

export function UpdateTodoDialog<TData>({
                                            titleModal,
                                            descriptionModal,
                                            onActionLabel,
                                            row
                                        }: UpdateTodoDialogProps<TData>) {
    const todo = todoTableSchema.parse(row.original);
    const [title, setTitle] = useState<string>(todo.title);
    const {update} = useTodoAction();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleUpdate = async () => {
        const updateData = {
            todoId: todo.todoId,
            title,
            isCompleted: todo.isCompleted
        };

        const isUpdated = await update(updateData);

        if (!isUpdated) {
            const currentErrorMessage = useTodoStore.getState().errorMessage;
            toast.error(currentErrorMessage ?? ErrorCode.UnknownError);
            return;
        }

        toast.success("Success!");
        setIsDialogOpen(false);
    }

    return (
        <ActionRecordDialog
            actionButton={"Edit"}
            actionButtonModal={"Confirm edit"}
            titleDialog={"Edit Todo"}
            descriptionDialog={"Make changes to your todo here. Click \"Confirm edit\" when you're done."}
            titleModal={titleModal}
            descriptionModal={descriptionModal}
            onActionLabel={onActionLabel}
            handleAction={handleUpdate}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
        >
            <div className="flex items-center justify-center space-x-5">
                <Label htmlFor="title">
                    Title
                </Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
        </ActionRecordDialog>
    );
}