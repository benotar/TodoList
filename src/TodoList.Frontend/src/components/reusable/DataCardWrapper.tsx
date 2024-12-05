import {FC, ReactNode} from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import LinkButton from "@/components/reusable/LinkButton.tsx";
import DataCardHeader from "@/components/reusable/DataCardHeader.tsx";

type DataCardWrapperProps = {
    header: string;
    description: string;
    children: ReactNode;
    footerChildren: ReactNode;
}

const DataCardWrapper: FC<DataCardWrapperProps> = ({
                                                       header,
                                                       description,
                                                       children,
                                                       footerChildren
                                                   }: DataCardWrapperProps) => {



    return (
        <Card className="w-[97%] lg:w-[85%] lgx:w-[60%] 2xl:w-[40%]">
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
                {footerChildren}
                <LinkButton label={"Go to Home page"} link={"/"}/>
            </CardFooter>
        </Card>
    );
}

export default DataCardWrapper;