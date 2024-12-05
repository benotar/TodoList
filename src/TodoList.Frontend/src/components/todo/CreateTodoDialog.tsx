import {FC, useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import CreateRecordDialog from "@/components/reusable/CreateRecordDialog.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";
import {createTodoSchema} from "@/schema";
import {z} from "zod";
import {useTodoAction} from "@/common/hooks/useTodoAction.ts";
import {toast} from "sonner";
import {useTodoStore} from "@/store/todoStore.ts";

const CreateTodoDialog: FC = () => {

    const {create} = useTodoAction();
    const [title, setTitle] = useState<string>("");
    const [isCompleted, setIsCompleted] = useState<CheckedState>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);


    const handleCreate = async () => {
        try {

            const newTodoData = createTodoSchema.parse({title, isCompleted});

            const isCreated = await create(newTodoData);

            if (!isCreated) {

                toast.warning(useTodoStore.getState().errorMessage);

                return;
            }

            toast.success("Success!");
            setIsDialogOpen(false);
        } catch (error) {

            if (error instanceof z.ZodError) {
                toast.error(`${error.errors.map(err => err.message).join(", ")}.`);
            }
        }
    }

    return (
        <CreateRecordDialog
            titleDialog={"Create a new Todo"}
            descriptionDialog={"Enter the details for your new todo. Once you're done, click \"Create\" to add it to your list."}
            titleModal={"Are you absolutely sure?"}
            descriptionModal={"Review the task details before confirming creation."}
            onActionLabel={"Yes, create"}
            handleCreate={handleCreate}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
        >
            <div className="flex flex-col justify-start items-start space-y-5">
                <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <Label htmlFor="title">
                        Title
                    </Label>
                    <Input
                        placeholder="Enter title..."
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="flex items-start justify-start space-x-5">
                    <Label htmlFor="completed">
                        Completed
                    </Label>
                    <Checkbox
                        checked={isCompleted}
                        onCheckedChange={(value) => setIsCompleted(value)}
                        id="completed"/>
                </div>
            </div>
        </CreateRecordDialog>
    );
};

export default CreateTodoDialog;