import {FC, ReactNode} from "react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card.tsx" ;
import HomeCardHeader from "@/components/home/HomeCardHeader.tsx";

type HomeCardWrapperProps = {
    title: string;
    description: string;
    children: ReactNode;
}

const HomeCardWrapper: FC<HomeCardWrapperProps> = ({title, description, children}:HomeCardWrapperProps) => {
    return (
        <Card className="w-full max-w-lg shadow-md">
            <CardHeader>
                <HomeCardHeader title={title} description={description}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};

export default HomeCardWrapper;