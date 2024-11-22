import {FC} from "react";

type HomeCardHeaderProps = {
    title: string;
    description: string;
}

const HomeCardHeader: FC<HomeCardHeaderProps> = ({title, description}: HomeCardHeaderProps) => {
    return (
        <div className="flex flex-col gap-y-2">
            <h1 className="text-base font-semibold text-center">{title}</h1>
            <h3 className="text-sm font-semibold text-center">{description}</h3>
        </div>
    );
};


export default HomeCardHeader;