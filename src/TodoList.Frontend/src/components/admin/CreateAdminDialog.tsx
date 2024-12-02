import {Row} from "@tanstack/react-table";
import ActionRecordDialog from "@/components/reusable/ActionRecordDialog.tsx";
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

type CreateAdminDialogProps<TData> = {
    titleModal: string;
    descriptionModal: string;
    onActionLabel: string;
    row: Row<TData>
};

export function CreateAdminDialog<TData>({
                                            titleModal,
                                            descriptionModal,
                                            onActionLabel,
                                            row
                                        }: CreateAdminDialogProps<TData>) {
    const handleCreate = async () => {

    }

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    return (
        <ActionRecordDialog
            actionButton={"Create Admin"}
            actionButtonModal={"Create"}
            titleDialog={"Create Admin"}
            descriptionDialog={"Here you can create a user with advanced permission"}
            titleModal={titleModal}
            descriptionModal={descriptionModal}
            onActionLabel={onActionLabel}
            handleAction={handleCreate}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
        >
            <div className="flex flex-col justify-start items-start space-y-5">
                <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <Label htmlFor="userName">
                        User Name
                    </Label>
                    <Input placeholder={"Enter username..."}/>
                </div>
                <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input placeholder={"Enter name..."}/>
                </div>
                <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input
                        placeholder={"Enter password..."}
                        type="password"
                    />
                </div>
            </div>
        </ActionRecordDialog>
    );
}
