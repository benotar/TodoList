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
        <Card className="w-2/3 sm:w-[43%] lg:w-[35%] lgx:w-[24%] 2xl:w-3/12 2k:w-[13%]">
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