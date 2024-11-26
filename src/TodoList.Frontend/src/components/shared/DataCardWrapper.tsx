import {FC, ReactNode} from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import LinkButton from "@/components/shared/LinkButton.tsx";
import DataCardHeader from "@/components/shared/DataCardHeader.tsx";

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
        <Card className="w-full">
            <CardHeader className="flex justify-center items-center">
                <DataCardHeader
                    title={header}
                    description={description}
                />
            </CardHeader>
            <CardContent >
                {children}
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                <LinkButton label={"Go to Home page"} link={"/"}/>
            </CardFooter>
        </Card>
    );
}

export default DataCardWrapper;