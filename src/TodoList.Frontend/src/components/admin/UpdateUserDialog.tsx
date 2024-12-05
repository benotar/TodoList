import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {usersTableSchema} from "@/schema";
import {Row} from "@tanstack/react-table";
import {toast} from "sonner";
import {ErrorCode} from "@/types/models/response/Errors.ts";
import ActionRecordDialog from "@/components/reusable/ActionRecordDialog.tsx";
import {UpdateUser} from "@/types/models/request/UserRequest.ts";
import {useAdminAction} from "@/common/hooks/useAdminAction.ts";
import {useAdminStore} from "@/store/adminStore.ts";

type UpdateUserDialogProps<TData> = {
    titleModal: string;
    descriptionModal: string;
    onActionLabel: string;
    row: Row<TData>
};

export function UpdateUserDialog<TData>({
                                            titleModal,
                                            descriptionModal,
                                            onActionLabel,
                                            row
                                        }: UpdateUserDialogProps<TData>) {

    const user = usersTableSchema.parse(row.original);

    const [userName, setUserName] = useState<string>(user.userName);
    const [name, setName] = useState<string>(user.name);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const {updateUser} = useAdminAction();

    const handleUpdate = async () => {

        const updateData: UpdateUser = {
            userId: user.userId,
            userName: userName,
            name: name
        };

        const isUpdated = await updateUser(updateData);

        if (!isUpdated) {
            const currentErrorMessage = useAdminStore.getState().errorMessage;
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
            <div className="flex flex-col justify-start items-start space-y-5">
                <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <Label htmlFor="username">
                        Username
                    </Label>
                    <Input
                        value={userName}
                        placeholder="Enter username..."
                        id="username"
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input
                        value={name}
                        placeholder="Enter name..."
                        id="name"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
            </div>
        </ActionRecordDialog>
    );
}