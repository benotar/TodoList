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
        <Card className="w-2/3 md:w-1/2 xl:w-1/4 2xl:w-3/12">
            <CardHeader>
                <DataCardHeader
                    title={header}
                    description={description}
                />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <LinkButton label={"Go to Home page"} link={"/"}/>
            </CardFooter>
        </Card>
    );
}

export default DataCardWrapper;