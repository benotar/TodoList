import {FC} from "react";
import {useConfirmationState} from "@/common/hooks/useConfirmationState.ts";
import {useConfirmationAction} from "@/common/hooks/useConfirmationAction.ts";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";

const ConfirmationDialog: FC = () => {

    const {
        isOpen,
        title,
        description,
        cancelLabel,
        actionLabel,
        onAction,
    } = useConfirmationState();

    const {closeConfirmation } = useConfirmationAction();

    return (
        <AlertDialog open={isOpen} onOpenChange={closeConfirmation}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {cancelLabel}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onAction}>
                        {actionLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmationDialog;