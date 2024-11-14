import {FC} from "react";

type HomeCardHeaderProps = {
    title: string;
    description: string; }

const HomeCardHeader: FC<HomeCardHeaderProps> = ({title, description}:HomeCardHeaderProps) => {
    return(
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className="text-3xl font-semibold text-center">{title}</h1>
            <p className="text-muted-foreground text-base text-center">{description}</p>
        </div>
    );
};


export default HomeCardHeader;