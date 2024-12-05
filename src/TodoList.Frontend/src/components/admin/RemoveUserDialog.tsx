import {Row} from "@tanstack/react-table";
import ActionRecordDialog from "@/components/reusable/ActionRecordDialog.tsx";
import {usersTableSchema} from "@/schema";
import {useState} from "react";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/Errors.ts";
import {useAdminAction} from "@/common/hooks/useAdminAction.ts";
import {useAdminStore} from "@/store/adminStore.ts";

type RemoveUserDialogProps<TData> = {
    titleModal: string;
    descriptionModal: string;
    onActionLabel: string;
    row: Row<TData>
}

export function RemoveUserDialog<TData>({
                                            titleModal,
                                            descriptionModal,
                                            onActionLabel,
                                            row
                                        }: RemoveUserDialogProps<TData>) {

    const user = usersTableSchema.parse(row.original);
    const {deleteUser} = useAdminAction();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleDelete = async () => {

        const isRemoved = await deleteUser(user.userId);

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