import ActionRecordDialog from "@/components/reusable/ActionRecordDialog.tsx";
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "sonner";
import {RegisterValues} from "@/types/store/Auth.ts";
import {z} from "zod";
import {registerFormSchema} from "@/schema";
import {useAdminAction} from "@/common/hooks/useAdminAction.ts";
import {useAdminStore} from "@/store/adminStore.ts";

type CreateAdminDialogProps = {
    titleModal: string;
    descriptionModal: string;
    onActionLabel: string;
};

export function CreateAdminDialog({
                                             titleModal,
                                             descriptionModal,
                                             onActionLabel
                                         }: CreateAdminDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const {createAdmin} = useAdminAction();


    const handleCreate = async () => {
        try {
            const createAdminData: RegisterValues = registerFormSchema.parse({userName, name, password});

            const isAdminCreated = await createAdmin(createAdminData);

            if(!isAdminCreated) {

                toast.warning(useAdminStore.getState().errorMessage);

                return;
            }

            toast.success("Success!");
            setIsDialogOpen(false);
        } catch(error) {

            if (error instanceof z.ZodError) {
                toast.error(`${error.errors.map(err => err.message).join(", ")}.`);
            }
        }
    }


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
                        Username
                    </Label>
                    <Input
                        value={userName}
                        placeholder={"Enter username..."}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input
                        value={name}
                        placeholder={"Enter name..."}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input
                        value={password}
                        placeholder={"Enter password..."}
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
            </div>
        </ActionRecordDialog>
    );
}
