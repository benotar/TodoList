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
        <Card className="w-[72.9%] sm:w-[40.4%] lg:w-[30.2%] lgx:w-[21.5%] 2xl:w-[20%] 2k:w-[11%]">
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