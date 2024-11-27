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

    const {openConfirmation} = useConfirmationAction();

    const handleUpdate = () => {
        alert(title);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit todo</DialogTitle>
                    <DialogDescription>
                        Make changes to your todo here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            className="col-span-3"
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
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