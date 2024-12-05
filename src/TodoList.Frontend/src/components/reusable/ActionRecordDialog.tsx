import {FC, ReactNode} from "react";
import {useConfirmationAction} from "@/common/hooks/useConfirmationAction.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

type ActionRecordDialogProps = {
    actionButton: string;
    actionButtonModal: string;
    titleDialog: string;
    descriptionDialog: string;
    titleModal: string;
    descriptionModal: string;
    onActionLabel: string;
    handleAction: () => Promise<void>;
    isDialogOpen: boolean;
    setIsDialogOpen: (isDialogOpen: boolean) => void;
    children: ReactNode;
}

const ActionRecordDialog: FC<ActionRecordDialogProps> = ({
                                                             actionButton,
                                                             actionButtonModal,
                                                             titleDialog,
                                                             descriptionDialog,
                                                             titleModal,
                                                             descriptionModal,
                                                             onActionLabel,
                                                             children,
                                                             handleAction,
                                                             isDialogOpen,
                                                             setIsDialogOpen
                                                         }) => {
    const {openConfirmation} = useConfirmationAction();

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    className="h-8"
                    size="default"
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                >
                    {actionButton}
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
                            onAction: handleAction,
                            onCancel: () => {
                            }
                        });
                    }}
                    >
                        {actionButtonModal}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ActionRecordDialog;