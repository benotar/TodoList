import {FC, ReactNode} from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import LinkButton from "@/components/shared/LinkButton.tsx";
import DataCardHeader from "@/components/shared/DataCardHeader.tsx";
import CreateRecordDialog from "@/components/shared/CreateRecordDialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

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
                >
                    <div className="flex flex-col space-y-5">
                        <div className="flex items-center justify-center space-x-5">
                            <Label htmlFor="title">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={"title"}
                                // onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="flex  items-center justify-center space-x-5 ">
                            <Label htmlFor="title">
                                Completed
                            </Label>
                            <Input
                                id="title"
                                value={"title"}
                                // onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                    </div>
                </CreateRecordDialog>
                <LinkButton label={"Go to Home page"} link={"/"}/>
            </CardFooter>
        </Card>
    );
}

export default DataCardWrapper;