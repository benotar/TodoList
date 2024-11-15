import {FC} from "react";

type MyCardHeaderProps = {
    title: string;
    description: string; }

const AuthCardHeader: FC<MyCardHeaderProps> = ({title, description}:MyCardHeaderProps) => {
    return(
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="text-muted-foreground text-sm">{description}</p>
        </div>
    );
};


export default AuthCardHeader;