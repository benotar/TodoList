import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {todoTableSchema} from "@/schema";
import {Row} from "@tanstack/react-table";
import {useConfirmationAction} from "@/common/hooks/useConfirmationAction.ts";
import {useTodoAction} from "@/common/hooks/useTodoAction.ts";
import {toast} from "sonner";
import {useTodoStore} from "@/store/todoStore.ts";
import {ErrorCode} from "@/types/models/response/AuthResponse.ts";

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

    const {openConfirmation} = useConfirmationAction();

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                >Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex justify-center items-center space-y-3">
                    <DialogTitle>Edit todo</DialogTitle>
                    <DialogDescription>
                        Make changes to your todo here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
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
                <DialogFooter>
                    <Button onClick={() => {
                        openConfirmation({
                            title: titleModal,
                            description: descriptionModal,
                            cancelLabel: "Cancel",
                            actionLabel: onActionLabel,
                            onAction: handleUpdate,
                            onCancel: () => {
                            }
                        });
                    }}
                    >
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}