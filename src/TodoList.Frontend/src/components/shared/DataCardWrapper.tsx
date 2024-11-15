import {FC, ReactNode} from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import LinkButton from "@/components/shared/LinkButton.tsx";

type DataCardWrapperProps = {
    header: ReactNode;
    children: ReactNode;
}

const DataCardWrapper: FC<DataCardWrapperProps> = ({header, children}: DataCardWrapperProps) => {
    return (
        <Card className="w-full shadow-md">
            <CardHeader>
                {header}
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