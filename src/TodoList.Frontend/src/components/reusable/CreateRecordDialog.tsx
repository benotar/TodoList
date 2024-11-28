import {FC, ReactNode} from "react";
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

import {useConfirmationAction} from "@/common/hooks/useConfirmationAction.ts";


type CreateTodoDialogProps = {
    titleDialog: string;
    descriptionDialog: string;
    titleModal: string;
    descriptionModal: string;
    onActionLabel: string;
    handleCreate: () => Promise<void>
    isDialogOpen: boolean;
    setIsDialogOpen: (isDialogOpen: boolean) => void;
    children: ReactNode;
}

const CreateRecordDialog: FC<CreateTodoDialogProps> = ({
                                                           titleDialog,
                                                           descriptionDialog,
                                                           titleModal,
                                                           descriptionModal,
                                                           onActionLabel,
                                                           children,
                                                           handleCreate,
                                                           isDialogOpen,
                                                           setIsDialogOpen
                                                       }) => {
    const {openConfirmation} = useConfirmationAction();

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                >
                    Create a new entry
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex justify-center items-center space-y-3">
                    <DialogTitle>{titleDialog}</DialogTitle>
                    <DialogDescription>{descriptionDialog}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Button onClick={() => {
                        openConfirmation({
                            title: titleModal,
                            description: descriptionModal,
                            cancelLabel: "Cancel",
                            actionLabel: onActionLabel,
                            onAction: handleCreate,
                            onCancel: () => {
                            }
                        });
                    }}
                    >
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateRecordDialog;