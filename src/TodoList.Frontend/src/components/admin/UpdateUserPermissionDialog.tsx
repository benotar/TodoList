import {Row} from "@tanstack/react-table";
import {usersTableSchema} from "@/schema";
import {useState} from "react";
import {useTodoStore} from "@/store/todoStore.ts";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/Errors.ts";
import ActionRecordDialog from "@/components/reusable/ActionRecordDialog.tsx";
import {Permission} from "@/types/store/Auth.ts";
import {UpdatePermission} from "@/types/models/request/UserRequest.ts";
import {useAdminAction} from "@/common/hooks/useAdminAction.ts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type UpdateUserPermissionDialogProps<TData> = {
    titleModal: string;
    descriptionModal: string;
    onActionLabel: string;
    row: Row<TData>
};

export function UpdateUserPermissionDialog<TData>({
                                                      titleModal,
                                                      descriptionModal,
                                                      onActionLabel,
                                                      row
                                                  }: UpdateUserPermissionDialogProps<TData>) {

    const user = usersTableSchema.parse(row.original);
    const [selectedPermission, setSelectedPermission] = useState<Permission | undefined>(undefined);
    const {updateUserPermission} = useAdminAction();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleUpdate = async () => {

        if (!selectedPermission || selectedPermission === user.permission as Permission) {
            toast.warning(ErrorCode.SelectPermission);
            return;
        }

        const updateData: UpdatePermission = {
            userId: user.userId,
            permission: selectedPermission,
        };

        const isUpdated = await updateUserPermission(updateData);

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
            actionButton={"Edit permission"}
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
            <div className="flex items-center justify-start space-x-5">
                <Select onValueChange={(value) =>
                    setSelectedPermission(value as Permission)
                }>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Permission"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Advanced">{Permission.Advanced}
                        </SelectItem>
                        <SelectItem value="Basic">{Permission.Basic}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </ActionRecordDialog>
    );
}