import {FC, ReactNode, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import LinkButton from "@/components/reusable/LinkButton.tsx";
import DataCardHeader from "@/components/reusable/DataCardHeader.tsx";
import CreateRecordDialog from "@/components/reusable/CreateRecordDialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {CheckedState} from "@radix-ui/react-checkbox";

type DataCardWrapperProps = {
    header: string;
    description: string;
    children: ReactNode;
}

const DataCardWrapper: FC<DataCardWrapperProps> = ({
                                                       header,
                                                       description,
                                                       children
                                                   }: DataCardWrapperProps) => {

    const [title, setTitle] = useState<string>("");
    const [isCompleted, setIsCompleted] = useState<CheckedState>(false);

    const handleCreate = async () => {
        alert(`${title}, ${isCompleted}`);
    }

    return (
        <Card className="w-[90%] sm:w-[85%] lg:w-[75%] lgx:w-[53.3%] 2xl:w-[40%]">
            <CardHeader className="flex justify-start items-start">
                <DataCardHeader
                    title={header}
                    description={description}
                />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex justify-center items-center space-x-5">
                <CreateRecordDialog
                    titleDialog={"Create a new Todo"}
                    descriptionDialog={"Enter the details for your new todo. Once you're done, click \"Create\" to add it to your list."}
                    titleModal={"lock"}
                    descriptionModal={"lock"}
                    onActionLabel={"lock"}
                    handleCreate={handleCreate}
                >
                    <div className="flex flex-col justify-start items-start space-y-5">
                        <div className="w-full flex flex-col items-start justify-start space-y-2">
                            <Label htmlFor="title">
                                Title
                            </Label>
                            <Input
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
                <LinkButton label={"Go to Home page"} link={"/"}/>
            </CardFooter>
        </Card>
    );
}

export default DataCardWrapper;