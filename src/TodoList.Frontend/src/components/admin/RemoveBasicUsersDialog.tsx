import ActionRecordDialog from "@/components/reusable/ActionRecordDialog.tsx";
import {useState} from "react";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/Errors.ts";
import {useAdminAction} from "@/common/hooks/useAdminAction.ts";
import {useAdminStore} from "@/store/adminStore.ts";

type RemoveBasicUsersDialogProps = {
    titleModal: string;
    descriptionModal: string;
    onActionLabel: string;
}

export function RemoveBasicUsersDialog({
                                            titleModal,
                                            descriptionModal,
                                            onActionLabel,
                                        }: RemoveBasicUsersDialogProps) {

    const {deleteBasicUsers} = useAdminAction();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleDelete = async () => {

        const isRemoved = await deleteBasicUsers();

        if (!isRemoved) {

            const currentErrorMessage = useAdminStore.getState().errorMessage;

            toast.error(currentErrorMessage ?? ErrorCode.UnknownError);

            return;
        }

        toast.success("Success!");
        setIsDialogOpen(false);
    }

    return (
        <ActionRecordDialog
            actionButton={"Remove basic"}
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